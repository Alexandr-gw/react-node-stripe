import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import configureStore from './store/store/configureStore';
import Footer from './components/Footer/Footer';

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
