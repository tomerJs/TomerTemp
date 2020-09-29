import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export const LoadingScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
};

export default LoadingScreen;