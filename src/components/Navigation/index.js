import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../contexts/Application';
import { AuthContext } from '../../contexts/Auth';

const Navigation = () => {
  const {
    setIsAuthenticated,
  } = useContext(AuthContext);
  const { userProfile, setUserProfile } = useContext(ApplicationContext);

  const { firstName } = userProfile;

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        Hello {firstName}!
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            margin: '0 10px',
          }}
        >
          <Link to="/">Home</Link>
        </div>
        <div
          style={{
            margin: '0 10px',
          }}
        >
          <Link to="/user-profile">Profil utilizator</Link>
        </div>
        <div
          style={{
            margin: '0 10px',
            cursor: 'pointer'
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navigation;
