// src/App.tsx
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import { fetchCurrentUser } from './features/auth/slices/authSlice';
import ErrorBoundary from './shared/components/common/ErrorBoundary';
import './styles/globals.css';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
          <Toaster position="top-right" />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;