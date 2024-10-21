import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import configureStore from './store/store/configureStore';

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
          <NavBar />
          <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
