import api from './api.js';

export default {
  isAuthenticated: false,
  async authenticate() {
    const localSession = getLocalSession();
    if (!localSession) {
      return;
    }
    const session = await api.getSession(localSession);
    if (session) {
      this.isAuthenticated = true;
    }
  },
  async login(name, password) {
    const user = await api.getUser(name, password);
    if (!user) {
      return;
    }
    setLocalSession(user.session);
    this.isAuthenticated = true;
  },
  async logout() {
    await delayedPromise();
    this.isAuthenticated = false;
  },
};

function delayedPromise(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

function getLocalSession() {
  return localStorage.getItem('session');
}

function setLocalSession(session) {
  localStorage.setItem('session', session);
}
