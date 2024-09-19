const setupStorageListener = () => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token_removed') {
        alert('Authorization token has been removed in another tab');
      }
    });
  };
  
  export default setupStorageListener;
  