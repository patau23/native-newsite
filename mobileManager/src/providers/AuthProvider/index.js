import React, {useCallback, useEffect, useMemo, useState} from "react"
import Cookies from "js-cookie"
import {AuthContext} from "../../contexts/authContext/context"
import api from "../../services/api"

export function AuthProvider (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setTokenData] = useState(null)

  const setToken = useCallback(tokenData => {
    setTokenData(tokenData)

    if (tokenData) {
      Cookies.set("auth-token", tokenData)
    } else {
      Cookies.remove("auth-token")
    }
    console.log("Provider 12 - setToken work")
  }, [])

  const logOut = useCallback(() => {
    setUser(null)
    setToken(null)
    console.log("Provider 23 - logOut work")
  }, [setToken])

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token")
    setTokenData(tokenData)

    try {
      if (tokenData) {
        const {data} = await api.auth.getProfile()
        setUser(data)
      }
    } catch {
      setToken(null)
    } finally {
      setIsLoaded(true)
    }
    console.log("Provider 29 - loadData work")
  }, [setToken])

  useEffect(() => {
    loadData()
    console.log("Provider 46 - useEffect with loaddata work")
  }, [loadData])

  const contextValue = useMemo(
    function () {
      console.log("Provider 52 - useMemo work")
      return {
        isLoaded,
        user,
        token,
        setUser,
        setToken,
        logOut,
      }
    },
    [isLoaded, user, token, setToken, logOut],
  )

  console.log("AuthProvider")
  console.log('my cookies are ',Cookies)
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
