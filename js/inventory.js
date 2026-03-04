// ===== Full Inventory Page =====
async function loadInventory() {
  const grid = document.getElementById('inventory-grid');
  const timestampEl = document.getElementById('inventory-timestamp');

  try {
    const res = await fetch('../data/inventory.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    if (data.lastUpdated && timestampEl) {
      const date = new Date(data.lastUpdated);
      timestampEl.textContent = 'Last updated: ' + date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    }

    if (!data.listings || data.listings.length === 0) {
      grid.innerHTML =
        '<div class="inventory-error">' +
          '<p>No listings available right now.</p>' +
          '<a href="https://www.ebay.com/sch/i.html?item=167115244180&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=cardscards.com" ' +
             'target="_blank" rel="noopener" class="btn btn-primary btn-sm">Browse eBay Store</a>' +
        '</div>';
      return;
    }

    grid.innerHTML = data.listings.map(item => `
      <a href="${item.link}" target="_blank" rel="noopener" class="inventory-card">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="inventory-card-img"
          loading="lazy"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%2313131f%22%3E%3Crect width=%22300%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23555570%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'"
        >
        <div class="inventory-card-body">
          <p class="inventory-card-title">${item.title}</p>
          <div class="inventory-card-footer">
            <span class="inventory-card-price">${item.price}</span>
            <span class="btn-outline">Buy Now</span>
          </div>
        </div>
      </a>
    `).join('');
  } catch (err) {
    console.error('Failed to load inventory:', err);
    grid.innerHTML =
      '<div class="inventory-error">' +
        '<p>Couldn\'t load inventory right now.</p>' +
        '<a href="https://www.ebay.com/sch/i.html?item=167115244180&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=cardscards.com" ' +
           'target="_blank" rel="noopener" class="btn btn-primary btn-sm">Browse eBay Store</a>' +
      '</div>';
  }
}

// ===== Footer Newsletter =====
document.getElementById('footer-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  console.log('[Newsletter Signup]', email);
  e.target.hidden = true;
  document.getElementById('footer-success').hidden = false;
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  loadInventory();
});
