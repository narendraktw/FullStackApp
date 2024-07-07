import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LogoutButton from 'src/components/LogoutButton';
import Box from '@mui/material/Box'; // Import Box
import { Outlet } from 'react-router-dom'; // Import Outlet
import { Button } from '@mui/material'; // Import Button

interface NavLink {
  label: string;
  to: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  // Add more links as needed
];

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Your App Name
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                component={Link}
                to={link.to}
                key={link.label}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  marginRight: 2,
                }}
              >
                {link.label}
              </Button>
            ))}
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet /> {/* Render the page content below the navigation */}
    </>
  );
};

export default Navbar;
