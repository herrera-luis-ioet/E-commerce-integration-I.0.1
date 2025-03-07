import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes';

// PUBLIC_INTERFACE
/**
 * Root App component that sets up the Redux store, React Router, and main layout
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;