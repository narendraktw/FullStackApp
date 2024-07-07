import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axiosInstance from 'src/utils/axiosInstance';
import { useAppDispatch } from 'src/app/hook';
import { logout } from 'src/features/auth/authSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axiosInstance.post('/logout');
      // Dispatch logout action to update Redux state
      dispatch(logout());
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLogout} color="inherit" sx={{ textTransform: 'none' }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
