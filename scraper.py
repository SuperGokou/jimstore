"""
eBay inventory scraper for Lucky Breaks.
Fetches active listings and writes them to data/inventory.json.
Designed to run in GitHub Actions every 2 hours.
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

from bs4 import BeautifulSoup

STORE_URL = (
    "https://www.ebay.com/sch/i.html"
    "?_ssn=cardscards.com"
    "&_oac=1"
)

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/131.0.0.0 Safari/537.36"
)

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "inventory.json")


def clean_url(url):
    """Strip eBay tracking parameters from a listing URL."""
    if not url:
        return url
    try:
        parsed = urlparse(url)
        params = parse_qs(parsed.query)
        keep = {}
        for key in ("hash", "item"):
            if key in params:
                keep[key] = params[key][0]
        clean = parsed._replace(query=urlencode(keep) if keep else "")
        return urlunparse(clean)
    except Exception:
        return url


def clean_title(title):
    """Remove eBay UI noise from title text."""
    # Remove "Opens in a new window or tab" suffix
    title = re.sub(r"Opens in a new window or tab$", "", title).strip()
    # Remove "New Listing" prefix
    title = re.sub(r"^New Listing\s*", "", title).strip()
    return title


def upgrade_image_url(url):
    """Upgrade eBay thumbnail to larger image size."""
    if not url:
        return url
    # Replace s-l140 or s-l225 with s-l500 for higher quality
    return re.sub(r"s-l\d+", "s-l500", url)


def fetch_html(url):
    """Fetch page HTML using curl to avoid eBay's bot detection."""
    try:
        result = subprocess.run(
            ["curl", "-s", "-A", USER_AGENT, url],
            capture_output=True, timeout=30
        )
        if result.returncode != 0:
            raise RuntimeError(f"curl failed with exit code {result.returncode}")
        return result.stdout.decode("utf-8", errors="replace")
    except FileNotFoundError:
        # curl not available, fall back to requests
        import requests
        headers = {
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        return resp.text


def scrape_listings():
    """Fetch and parse eBay store listings."""
    print(f"Fetching: {STORE_URL}")
    html = fetch_html(STORE_URL)
    print(f"Got {len(html)} bytes")

    soup = BeautifulSoup(html, "html.parser")

    # eBay uses li.s-card in their current layout
    items = soup.select("ul.srp-results li.s-card")
    if not items:
        # Fallback to older selector
        items = soup.select("ul.srp-results li.s-item")

    listings = []

    for item in items:
        # Title: look for title class or heading
        title_el = (
            item.select_one("[class*=title]")
            or item.select_one("h3")
            or item.select_one(".s-item__title")
        )
        if not title_el:
            continue

        title = clean_title(title_el.get_text(strip=True))

        # Skip eBay's dummy placeholder
        if not title or title.lower().startswith("shop on ebay"):
            continue

        # Price
        price_el = (
            item.select_one("[class*=price]")
            or item.select_one(".s-item__price")
        )
        price = price_el.get_text(strip=True) if price_el else "N/A"

        # Image
        img_el = item.select_one("img")
        image = ""
        if img_el:
            image = img_el.get("data-src") or img_el.get("src") or ""
            image = upgrade_image_url(image)

        # Link - prefer itm links
        link_el = (
            item.select_one('a[href*="ebay.com/itm"]')
            or item.select_one("a[href]")
        )
        link = clean_url(link_el.get("href")) if link_el else ""

        if title and link:
            listings.append({
                "title": title,
                "price": price,
                "image": image,
                "link": link,
            })

    return listings


def main():
    try:
        listings = scrape_listings()
        print(f"Found {len(listings)} listings")

        if not listings:
            print("No listings found. Keeping existing data.")
            return

        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

        data = {
            "listings": listings,
            "lastUpdated": datetime.now(timezone.utc).isoformat(),
        }

        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Wrote {len(listings)} listings to {OUTPUT_PATH}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
