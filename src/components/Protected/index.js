import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';
import Navigation from '../Navigation';

const Protected = ({ children }) => {
  const {
    isAuthenticated,
  } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (<Navigate to="/login" />)
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Protected;
