import React, {useCallback, useEffect, useMemo, useState} from "react";
import {AuthContext} from "../../contexts/authContext/context";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setTokenData] = useState(null);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };
  const removeData = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  const setToken = useCallback(tokenData => {
    setTokenData(tokenData);

    if (tokenData) {
      storeData("auth-token", tokenData);
    } else {
      removeData("auth-token");
    }
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = await AsyncStorage.getItem("auth-token");
    setTokenData(tokenData);
    try {
      if (tokenData) {
        const {data} = await api.auth.getProfile();
        setUser(data.data);
      }
    } catch {
      setToken(null);
    } finally {
      setIsLoaded(true);
    }
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(() => {
    return {
      isLoaded,
      user,
      token,
      setUser,
      setToken,
      logOut,
    };
  }, [isLoaded, user, token, setToken, logOut]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
