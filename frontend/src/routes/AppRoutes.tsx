import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

import Home from 'src/pages/home/Home';
import About from 'src/pages/about/About';
import Login from 'src/pages/login/Login';
import Navbar from 'src/components/Navbar';
import PrivateRoutes from './PrivateRoutes';
import PageNotFound from 'src/pages/PageNotFound';

const AppRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Navbar />} {/* Render the Navbar only if logged in */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes  />}>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </>
  );
};

export default AppRoutes;
