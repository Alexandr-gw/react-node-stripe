import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import configureStore from './store/store/configureStore';
import './assets/css/App.css';

function App() {
  const store = configureStore();

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
