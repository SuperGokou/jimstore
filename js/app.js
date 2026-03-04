// ===== Break Data (Upcoming) =====
const BREAKS = [];

// ===== Past Events Data (scraped from Facebook group) =====
const PAST_EVENTS = [
  {
    id: 'event-1',
    title: 'Pokemon & Sportscard Show - Case Hit Promotions KC Fairgrounds',
    category: 'Sports Cards',
    date: 'Sat, Sep 20, 2025',
    location: 'Coeur d\'Alene, ID',
    joined: 100,
    image: 'img/event-1.jpg',
    fbUrl: 'https://www.facebook.com/events/29531399173171090/',
    host: 'Case Hit Promotions',
  },
  {
    id: 'event-2',
    title: 'Dirt Dog Sportscards - Card Show & Car Show',
    category: 'Card Show',
    date: 'Fri, Jun 28, 2024',
    location: 'Hoquiam, WA',
    joined: null,
    image: 'img/event-2.jpg',
    fbUrl: 'https://www.facebook.com/events/1512292912834435/',
    host: 'Dirt Dog Sports Cards',
  },
  {
    id: 'event-3',
    title: 'LIVE AUCTIONS BY JAMES',
    category: 'Live Auction',
    date: 'Tue, Feb 7, 2023',
    location: 'Online',
    joined: null,
    image: 'img/event-3.jpg',
    fbUrl: 'https://www.facebook.com/events/701729368267954/',
    host: 'James Willett',
  },
];

// ===== Active Tab State =====
let activeTab = 'past';

// ===== Render Event Cards (Past Events) =====
function renderPastEvents() {
  const grid = document.getElementById('breaks-grid');
  grid.innerHTML = PAST_EVENTS.map(e => {
    const joinedHtml = e.joined
      ? `<span class="event-card-meta-dot">&#8226;</span>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
         <span>${e.joined} interested</span>`
      : '';

    return `
    <a href="${e.fbUrl}" target="_blank" rel="noopener" class="event-card" data-event-id="${e.id}">
      <div class="event-card-image-wrap">
        <img src="${e.image}" alt="${e.title}" class="event-card-image" loading="lazy"
          onerror="this.style.display='none'">
        <div class="event-card-image-overlay"></div>
        <div class="event-card-image-bar"></div>
        <span class="event-card-category">${e.category}</span>
        <span class="event-card-sold-out">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          ENDED
        </span>
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${e.title}</h3>
        <div class="event-card-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
          <span>${e.date}</span>
          ${joinedHtml}
        </div>
        <div class="event-card-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${e.location}</span>
        </div>
        <div class="event-card-host">
          <div class="event-card-host-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4-4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="event-card-host-info">
            <span class="event-card-host-label">Hosted by</span>
            <span class="event-card-host-name">${e.host}</span>
          </div>
        </div>
      </div>
    </a>`;
  }).join('');
}

// ===== Render Upcoming Break Cards =====
function renderBreaks() {
  const grid = document.getElementById('breaks-grid');
  if (BREAKS.length === 0) {
    grid.innerHTML = `
      <div class="events-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <p>No upcoming breaks right now.</p>
        <p class="events-empty-sub">Check back soon or follow us on Facebook for announcements.</p>
      </div>`;
    return;
  }
  grid.innerHTML = BREAKS.map(b => {
    const fillPct = ((b.spots - b.spotsLeft) / b.spots) * 100;
    const soldOutClass = b.soldOut ? ' break-card-sold-out' : '';

    const hotBadge = b.hot ? `<span class="badge-hot"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c.5 3.5 2.04 5.22 4 6-2.08 1.35-3.5 3.44-4 7-0.5-3.56-1.92-5.65-4-7 1.96-.78 3.5-2.5 4-6z"/></svg>HOT</span>` : '';

    return `
      <div class="break-card${soldOutClass}" data-break-id="${b.id}">
        <div class="break-card-body">
          <div>
            <span class="${b.soldOut ? 'badge-sold-out' : 'break-card-category'}">${b.soldOut ? 'Sold Out' : b.category}</span>${hotBadge}
          </div>
          <h3 class="break-card-title" style="margin-top:12px">${b.title}</h3>
          <div class="break-card-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>${b.date}</span>
          </div>
          <div class="break-card-row">
            <div class="break-card-price">${b.price}<span class="break-card-price-unit">/spot</span></div>
            <div class="break-card-spots">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <strong>${b.spots - b.spotsLeft}</strong><span>/${b.spots}</span>
            </div>
          </div>
          <div class="break-card-progress">
            <div class="break-card-progress-fill" style="width:${fillPct}%"></div>
          </div>
          <button
            class="btn btn-primary btn-register"
            ${b.soldOut ? 'disabled' : ''}
          >
            ${b.soldOut ? 'Sold Out' : 'Lock Spot'}
          </button>
          ${!b.soldOut ? '<p class="break-card-note">Account required to reserve</p>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ===== Tab Switching =====
function switchTab(tab) {
  activeTab = tab;
  const tabs = document.querySelectorAll('.events-tab');
  tabs.forEach(t => {
    if (t.dataset.tab === tab) {
      t.classList.add('events-tab--active');
    } else {
      t.classList.remove('events-tab--active');
    }
  });

  const viewAllBtn = document.querySelector('.events-view-all');

  if (tab === 'past') {
    renderPastEvents();
    viewAllBtn.style.display = 'block';
  } else {
    renderBreaks();
    viewAllBtn.style.display = 'none';
  }

  // Update tab counts
  document.getElementById('upcoming-count').textContent = BREAKS.length;
  document.getElementById('past-count').textContent = PAST_EVENTS.length;
}

// ===== Modal System =====
const modalOverlay = document.getElementById('modal');
const modalFormState = document.getElementById('modal-form-state');
const modalSuccessState = document.getElementById('modal-success-state');
const modalBreakName = document.getElementById('modal-break-name');
const modalForm = document.getElementById('modal-form');
let modalAutoCloseTimer = null;

function openModal(breakId) {
  const breakData = BREAKS.find(b => b.id === breakId);
  if (!breakData || breakData.soldOut) return;

  modalBreakName.textContent = breakData.title;
  modalFormState.hidden = false;
  modalSuccessState.hidden = true;
  modalForm.reset();
  modalOverlay.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.classList.remove('modal-open');
  if (modalAutoCloseTimer) {
    clearTimeout(modalAutoCloseTimer);
    modalAutoCloseTimer = null;
  }
}

// Event delegation for register buttons
document.getElementById('breaks-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-register');
  if (!btn || btn.disabled) return;
  const card = btn.closest('.break-card');
  openModal(card.dataset.breakId);
});

// Close on backdrop click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close button
document.querySelector('.modal-close').addEventListener('click', closeModal);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

// ===== Form Handling =====

// VIP Form
document.getElementById('vip-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  console.log('[VIP Signup]', email);
  e.target.hidden = true;
  document.getElementById('vip-success').hidden = false;
});

// Modal Form
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const breakName = modalBreakName.textContent;
  console.log('[Break Registration]', breakName, email);
  modalFormState.hidden = true;
  modalSuccessState.hidden = false;
  modalAutoCloseTimer = setTimeout(closeModal, 3000);
});

// Giveaway Form
document.getElementById('giveaway-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  console.log('[Giveaway Entry]', email);
  e.target.hidden = true;
  document.getElementById('giveaway-success').hidden = false;
});

// Footer newsletter form
document.getElementById('footer-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  console.log('[Newsletter Signup]', email);
  e.target.hidden = true;
  document.getElementById('footer-success').hidden = false;
});

// ===== Inventory =====
async function loadInventory() {
  const grid = document.getElementById('inventory-grid');

  try {
    const res = await fetch('data/inventory.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    if (!data.listings || data.listings.length === 0) {
      grid.innerHTML =
        '<div class="inventory-error">' +
          '<p>No listings available right now.</p>' +
          '<a href="https://www.ebay.com/sch/i.html?item=167115244180&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=cardscards.com" ' +
             'target="_blank" rel="noopener" class="btn btn-primary btn-sm">Browse eBay Store</a>' +
        '</div>';
      return;
    }

    const preview = data.listings.slice(0, 8);

    grid.innerHTML = preview.map(item => `
      <div class="inventory-flip-card">
        <div class="inventory-flip-inner">
          <div class="inventory-flip-front">
            <img
              src="${item.image}"
              alt="${item.title}"
              class="inventory-card-img"
              loading="lazy"
              onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%2313131f%22%3E%3Crect width=%22300%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23555570%22 font-size=%2214%22%3ENo Image%3C/text%3E%3C/svg%3E'"
            >
            <div class="inventory-flip-price-badge">${item.price}</div>
          </div>
          <div class="inventory-flip-back">
            <div class="inventory-flip-back-inner">
              <svg class="inventory-flip-back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <p class="inventory-flip-back-title">${item.title}</p>
              <span class="inventory-flip-back-price">${item.price}</span>
              <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                Buy Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (data.listings.length > 8) {
      grid.innerHTML += `
        <div class="inventory-view-all">
          <a href="pages/inventory.html" class="btn btn-primary btn-sm">
            View All Inventory (${data.listings.length})
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </a>
        </div>`;
    }
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

// ===== Giveaway Countdown (to next Sunday) =====
function updateGiveawayCountdown() {
  var el = document.getElementById('giveaway-countdown');
  if (!el) return;
  var now = new Date();
  var nextSunday = new Date(now);
  var dayOfWeek = now.getDay(); // 0 = Sunday
  var daysUntil = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  nextSunday.setDate(now.getDate() + daysUntil);
  nextSunday.setHours(18, 0, 0, 0); // 6 PM Sunday
  if (nextSunday <= now) {
    // If it's past 6 PM Sunday, target next Sunday
    nextSunday.setDate(nextSunday.getDate() + 7);
  }
  var diff = nextSunday - now;
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  el.innerHTML =
    '<span class="countdown-label">Drawing in</span>' +
    '<div class="countdown-digits">' +
      '<div class="countdown-block"><span class="countdown-num">' + String(d).padStart(2, '0') + '</span><span class="countdown-unit">days</span></div>' +
      '<span class="countdown-sep">:</span>' +
      '<div class="countdown-block"><span class="countdown-num">' + String(h).padStart(2, '0') + '</span><span class="countdown-unit">hrs</span></div>' +
      '<span class="countdown-sep">:</span>' +
      '<div class="countdown-block"><span class="countdown-num">' + String(m).padStart(2, '0') + '</span><span class="countdown-unit">min</span></div>' +
      '<span class="countdown-sep">:</span>' +
      '<div class="countdown-block"><span class="countdown-num">' + String(s).padStart(2, '0') + '</span><span class="countdown-unit">sec</span></div>' +
    '</div>';
}

// ===== Store Open/Closed Status =====
function updateStoreStatus() {
  var el = document.getElementById('store-status');
  if (!el) return;

  // Get current time in PST (America/Los_Angeles)
  var now = new Date();
  var pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  var day = pst.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  var hour = pst.getHours();

  // Open: Wed(3)-Sun(0), 6PM-11PM PST
  var openDays = [0, 3, 4, 5, 6]; // Sun, Wed, Thu, Fri, Sat
  var isOpen = openDays.includes(day) && hour >= 18 && hour < 23;

  var storeIcon = '<svg class="store-status-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  if (isOpen) {
    el.className = 'store-status store-status--open';
    el.innerHTML = storeIcon +
      '<span class="store-status-dot"></span>' +
      '<span class="store-status-text">Live Now</span>';
  } else {
    el.className = 'store-status store-status--closed';
    el.innerHTML = storeIcon +
      '<span class="store-status-dot"></span>' +
      '<span class="store-status-text">Closed</span>';
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.events-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Default to past events tab (matching Figma design)
  switchTab('past');
  loadInventory();
  updateGiveawayCountdown();
  setInterval(updateGiveawayCountdown, 1000);
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);
});
