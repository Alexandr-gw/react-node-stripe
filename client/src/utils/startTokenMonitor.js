import Cookies from 'js-cookie';

const TOKEN_NAME = 'token';
const CHECK_INTERVAL = 1000; // 1 second

const startTokenMonitor = () => {
  let previousToken = Cookies.get(TOKEN_NAME);

  setInterval(() => {
    const currentToken = Cookies.get(TOKEN_NAME);

    // If the token was present and is now removed
    if (previousToken && !currentToken) {
      alert('Authorization token has been removed');
      localStorage.setItem('token_removed', Date.now()); // Notify other tabs
      window.location.reload();
    }

    previousToken = currentToken; // Update the previous token for the next check
  }, CHECK_INTERVAL);
};

export default startTokenMonitor;
