import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './views/Login';
import Home from './views/Home';
import UserProfile from './views/UserProfile';
import Profile from './views/Profile';
import Statistics from './views/Statistics';

import { AuthContext } from './contexts/Auth';
import { ApplicationContext } from './contexts/Application';

import { checkAuth, getUserProfile } from './services';

import Protected from './components/Protected';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const email = localStorage.getItem('email');

      if (email && accessToken) {
        const checkAuthResult = await checkAuth({
          email,
          accessToken,
        });

        if (checkAuthResult instanceof Error || !checkAuth) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setAccessToken(accessToken);
          setEmail(email);
          const getUserProfileResult = await getUserProfile({
            email,
            accessToken,
          });

          setUserProfile(getUserProfileResult);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsInitialized(true);
    };

    if (!isInitialized || !isAuthenticated) {
      initApp();
    }
  }, [isAuthenticated, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return (
    <ApplicationContext.Provider
      value={{
        isInitialized,
        setIsInitialized,
        userProfile,
        setUserProfile,
      }}
    >
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          accessToken,
          setAccessToken,
          email,
          setEmail,
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/statistics" element={<Statistics />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/user-profile"
              element={
                <Protected>
                  <UserProfile />
                </Protected>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApplicationContext.Provider>
  );
}
