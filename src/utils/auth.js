export default {
  isAuthenticated: false,
  async login() {
    await delayedPromise();
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
