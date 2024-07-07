import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
