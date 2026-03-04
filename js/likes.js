// ===== Like Feature =====
(function () {
  var BASE_LIKES = 2000;
  var STORAGE_KEY_EMAIL = 'lb_like_email';
  var STORAGE_KEY_LIKED = 'lb_liked';
  var STORAGE_KEY_NAME = 'lb_like_name';

  var likeBtn = document.getElementById('top-bar-like-btn');
  var likeCount = document.getElementById('top-bar-like-count');
  var likeModal = document.getElementById('like-modal');
  var likeFormState = document.getElementById('like-modal-form-state');
  var likeSuccessState = document.getElementById('like-modal-success-state');
  var likeForm = document.getElementById('like-modal-form');
  var likeCloseBtn = likeModal.querySelector('.like-modal-close');
  var autoCloseTimer = null;

  function isRegistered() {
    return !!localStorage.getItem(STORAGE_KEY_EMAIL);
  }

  function hasLiked() {
    return localStorage.getItem(STORAGE_KEY_LIKED) === '1';
  }

  function formatCount(n) {
    if (n >= 1000) {
      var k = n / 1000;
      return (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)) + 'K';
    }
    return String(n);
  }

  function updateUI() {
    var liked = hasLiked();
    var count = BASE_LIKES + (liked ? 1 : 0);
    likeCount.textContent = formatCount(count);

    if (liked) {
      likeBtn.classList.add('top-bar-like--active');
    } else {
      likeBtn.classList.remove('top-bar-like--active');
    }

    // Show follower name if registered
    var nameEl = document.getElementById('top-bar-follower-name');
    if (nameEl && isRegistered()) {
      var name = localStorage.getItem(STORAGE_KEY_NAME);
      if (name) {
        nameEl.textContent = name;
        nameEl.hidden = false;
      }
    }
  }

  function openLikeModal() {
    likeFormState.hidden = false;
    likeSuccessState.hidden = true;
    likeForm.reset();
    likeModal.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeLikeModal() {
    likeModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
  }

  function toggleLike() {
    if (hasLiked()) {
      localStorage.removeItem(STORAGE_KEY_LIKED);
    } else {
      localStorage.setItem(STORAGE_KEY_LIKED, '1');
    }
    updateUI();
  }

  // Like button click
  likeBtn.addEventListener('click', function () {
    if (!isRegistered()) {
      openLikeModal();
    } else {
      toggleLike();
    }
  });

  // Modal form submit
  likeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = e.target.email.value;
    var nameInput = e.target.querySelector('input[name="name"]');
    var name = nameInput ? nameInput.value.trim() : '';

    console.log('[Like Registration]', email, name);
    localStorage.setItem(STORAGE_KEY_EMAIL, email);
    if (name) {
      localStorage.setItem(STORAGE_KEY_NAME, name);
    }
    localStorage.setItem(STORAGE_KEY_LIKED, '1');
    updateUI();

    likeFormState.hidden = true;
    likeSuccessState.hidden = false;
    autoCloseTimer = setTimeout(closeLikeModal, 2500);
  });

  // Close modal
  likeCloseBtn.addEventListener('click', closeLikeModal);
  likeModal.addEventListener('click', function (e) {
    if (e.target === likeModal) closeLikeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !likeModal.hidden) closeLikeModal();
  });

  // Init
  updateUI();
})();
