import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import configureStore from './store/store/configureStore';
import './assets/css/App.css';
import startTokenMonitor from './utils/startTokenMonitor';
import setupStorageListener from './utils/setupStorageListener';

function App() {
  const store = configureStore();

  useEffect(() => {
    startTokenMonitor();
    setupStorageListener();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='wrapper'>
          <NavBar />
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
