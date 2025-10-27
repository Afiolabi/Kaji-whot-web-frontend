import { Routes, Route } from 'react-router-dom';
// import { useAppSelector } from '@/app/hooks';
import { ROUTES } from '@/shared/utils/constants';

// Layouts
import MainLayout from '@/shared/components/layout/MainLayout';
import GameLayout from '@/shared/components/layout/GameLayout';

// Pages
import Landing from '@/pages/Landing';
import GameModeSelection from '@/pages/GameModeSelection';
import OfflineGame from '@/pages/OfflineGame';
import Wallet from '@/pages/Wallet';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import CelebrityOnboarding from '@/pages/CelebrityOnboarding';
import NotFound from '@/pages/NotFound';

// Feature Pages
import { Lobby } from '@/features/lobby/components/Lobby';
import { GameRoom } from '@/features/game/components/GameRoom';

// Protected Route
import ProtectedRoute from '@/shared/components/common/ProtectedRoute';
import RoomBrowser from '@/features/rooms/components/RoomBrowser';

const AppRouter = () => {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Landing />} />

      {/* Protected Routes with MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.PLAY} element={<GameModeSelection />} />
        <Route path={ROUTES.OFFLINE} element={<OfflineGame />} />
        <Route path={ROUTES.FREE_ROOMS} element={<RoomBrowser mode="free" />} />
        <Route path={ROUTES.RANK_ROOMS} element={<RoomBrowser mode="rank" />} />
        <Route path={ROUTES.CELEBRITY_ROOMS} element={<RoomBrowser mode="celebrity" />} />
        <Route path={ROUTES.WALLET} element={<Wallet />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.CELEBRITY_ONBOARD} element={<CelebrityOnboarding />} />
      </Route>

      {/* Game Routes with GameLayout */}
      <Route
        element={
          <ProtectedRoute>
            <GameLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.LOBBY} element={<Lobby />} />
        <Route path={ROUTES.GAME} element={<GameRoom />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
