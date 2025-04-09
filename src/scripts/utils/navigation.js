export default class Navigation {
  static #drawerButton;
  static #navigationDrawer;
  static #initialized;
  static #isClosing;

  static init() {
    this.#drawerButton = document.getElementById('drawer-button');
    this.#navigationDrawer = document.getElementById('navigation-drawer');
    this.#initialized = false;
    this.#isClosing = false;
    if (this.#initialized) return;

    // Set initial state
    this.#setInitialState();
    
    // Event listeners
    this.#setupEventListeners();

    this.initialized = true;
  }

  static #setInitialState() {
    if (window.innerWidth <= 768) {
      this.#navigationDrawer.style.visibility = 'hidden';
      this.#navigationDrawer.style.transform = 'translateX(100%)';
    }
  }

  static #setupEventListeners() {
    // Drawer button click
    this.#drawerButton?.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log(event);
      this.toggleDrawer();
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.#handleResize();
    });

    // Click outside to close
    document.addEventListener('click', (event) => {
      if (this.isDrawerOpen() && 
          !this.#navigationDrawer.contains(event.target) &&
          !this.#drawerButton.contains(event.target)) {
        this.closeDrawer();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isDrawerOpen()) {
        this.closeDrawer();
      }
    });

    // Handle transition end
    this.#navigationDrawer.addEventListener('transitionend', (event) => {
      this.#handleTransitionEnd(event);
    });

    // Close on navigation
    window.addEventListener('hashchange', () => {
      if (window.innerWidth <= 768) {
        this.closeDrawer();
      }
    });
  }

  static #handleResize() {
    if (window.innerWidth > 768) {
      this.#navigationDrawer.style.visibility = 'visible';
      this.#navigationDrawer.classList.remove('open', 'closing');
      this.#drawerButton.classList.remove('open');
      document.body.classList.remove('drawer-open', 'overlay-visible');
      this.#navigationDrawer.style.transform = 'none';
    } else if (!this.isDrawerOpen()) {
      this.#navigationDrawer.style.visibility = 'hidden';
      this.#navigationDrawer.style.transform = 'translateX(100%)';
    }
  }

  static #handleTransitionEnd(event) {
    if (event.propertyName === 'transform') {
      if (!this.isDrawerOpen() && window.innerWidth <= 768) {
        this.#navigationDrawer.style.visibility = 'hidden';
        this.#navigationDrawer.classList.remove('closing');
        this.#isClosing = false;
      }
    }
  }

  static isDrawerOpen() {
    return this.#navigationDrawer.classList.contains('open');
  }

  static toggleDrawer() {
    if (window.innerWidth > 768) return;
    
    if (this.isDrawerOpen()) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  static openDrawer() {
    if (this.#isClosing || window.innerWidth > 768) return;
    
    this.#navigationDrawer.style.visibility = 'visible';
    requestAnimationFrame(() => {
      this.#drawerButton.classList.add('open');
      this.#navigationDrawer.classList.remove('closing');
      this.#navigationDrawer.classList.add('open');
      this.#navigationDrawer.style.transform = 'translateX(0%)';
      document.body.classList.add('drawer-open');
      setTimeout(() => {
        document.body.classList.add('overlay-visible');
      }, 50);
    });
  }

  static closeDrawer() {
    if (this.#isClosing || window.innerWidth > 768) return;
    
    this.#isClosing = true;
    this.#drawerButton.classList.remove('open');
    this.#navigationDrawer.classList.add('closing');
  
    requestAnimationFrame(() => {
      this.#navigationDrawer.classList.remove('open');
      this.#navigationDrawer.style.transform = 'translateX(100%)';
      document.body.classList.remove('overlay-visible');
  
      setTimeout(() => {
        document.body.classList.remove('drawer-open');
        this.#navigationDrawer.style.visibility = 'visible'; // Ensure it's still visible
        this.#isClosing = false;
      }, 300);
    });
  }

  static updateActiveLink() {
    const path = window.location.hash || '#/';
    const links = this.#navigationDrawer.querySelectorAll('a');
    links.forEach((link) => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}