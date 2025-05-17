import Router from '../utils/router';
import { setupSkipToContent } from '../utils';
import FavoriteManager from '../utils/favorite-manager';
import IndexedDBManager from '../utils/indexed-db-manager';
import * as StoryAPI from '../data/api';
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from '../templates';
import { getAccessToken, getLogout } from '../utils/auth';
import NotificationManager from '../utils/notification-manager';

export default class App {
  #content;
  #skipLinkButton;

  constructor({ content, skipLinkButton }) {
    this.#content = content;
    this.#skipLinkButton = skipLinkButton;

    // Set this app instance in the router
    Router.setApp(this);
    this.#init();
  }

  getContent() {
    return this.#content;
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupNavigationList();
    Router.init();
  }

  async #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navigationDrawer = document.getElementById('navigation-drawer');
    const navListMain = navigationDrawer?.children.namedItem('navlist-main');
    const navList = navigationDrawer?.children.namedItem('navlist');

    if (!isLogin) {
      if (navListMain) navListMain.innerHTML = '';
      if (navList) navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    } else {
      if (navListMain) navListMain.innerHTML = generateMainNavigationListTemplate();
      if (navList) navList.innerHTML = generateAuthenticatedNavigationListTemplate();
    }

    // Set up logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (confirm('Apakah Anda yakin ingin keluar?')) {
          getLogout();
        }
      });
    }

    // Initialize notification manager after navigation is set up
    if (isLogin) {
      await NotificationManager.init(StoryAPI);
    }
  }

  async updateNavigation() {
    await this.#setupNavigationList();
  }

  async initializeApp() {
    await FavoriteManager.init(StoryAPI);
    await this.#setupNavigationList();

    setInterval(() => {
      IndexedDBManager.clearOldCache();
      IndexedDBManager.clearAPICache();
    }, 60 * 60 * 1000);
  }
}