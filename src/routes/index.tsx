// Application routes configuration
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/auth',
    element: <div>Auth</div>,
  },
  {
    path: '/lobby',
    element: <div>Lobby</div>,
  },
  {
    path: '/game/:roomId',
    element: <div>Game</div>,
  },
  {
    path: '/profile',
    element: <div>Profile</div>,
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
]);