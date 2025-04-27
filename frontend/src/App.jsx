import { Route, Routes, useNavigate } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import { setNavigate } from './lib/navigation';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  // set the navigate function on our API client for use in the axios error interceptor
  // this allows us to redirect to the login page when an auth error occurs
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route path='/' element={<AppContainer />}>
        <Route index element={<Profile />} />
        <Route path='settings' element={<Settings />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/email/verify/:code' element={<VerifyEmail />} />
      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
