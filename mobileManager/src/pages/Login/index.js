import React, {useEffect, useState} from "react"
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  Text,
} from "react-native"

import api from "../../services/api/index"
import {useAuth} from "../../hooks/useAuth/useAuth"
import LoginInput from "../components/LoginInput"

import {style} from "../style"

const CONFIG = {
  cache: "no-cache",
  mode: "no-cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

export default function LoginScreen ({navigation}) {
  const auth = useAuth()

  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("adminadmin")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const [error, setError] = useState()

  const singIn = async () => {
    console.log("doing request")
    setIsLoading(true)
    await api.auth
      .login(
        JSON.stringify({
          username: username,
          password: password,
        }),
        CONFIG,
      )
      .then(({data}) => {
        setData(data)
      })
      .catch(e => {
        console.log(`error ${e.response.status}`)
        switch (e.response.status) {
          case 401:
            setError("Введен неправильный логин или пароль")
            console.log(username, password)
            break
          case 404:
            setError(
              `Запрос на авторизацию обработан, однако сервер не смог найти ответ, попробуйте зайти позже`,
            )
            break
          case 422:
            setError(
              `сервер успешно принял запрос, однако имеется какая-то логическая ошибка, из-за которой невозможно произвести операцию над ресурсом.`,
            )
            break
          default:
            setError(null)
            break
        }
        throw error
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    try {
      console.log(
        "attempt to write information to the global application provider",
      )
      auth.setToken(data.token)
      auth.setUser(data.data.id)
      console.log("succesful")
    } catch {
      console.log("information write attempt failed")
    }
  }, [data])

  return (
    <View style={style.screen}>
      <Text>Введите свои данные для входа</Text>
      <LoginInput
        isSecure={false}
        placeholder='login'
        onChangeText={login => setUsername(login)}
      />
      <LoginInput
        isSecure={true}
        placeholder='password'
        onChangeText={password => setPassword(password)}
      />
      {error ? <Text style={style.textErr}>{error}</Text> : <></>}
      <TouchableOpacity
        style={style.loginBtn}
        disabled={isLoading}
        onPress={() => {
          singIn()
        }}
      >
        <Text style={style.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}

/*   OLD FUNCTION
  const singIn = async () => {
    try {
      console.log("doing request")
      setIsLoading(true)
      const {data: loginData} = await api.auth.login(
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          cache: "no-cache",
          mode: "no-cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )
      setData(loginData)
      console.log(loginData)
    } catch (e) {
      console.log(`error ${e.response.status}`)
      switch (e.response.status) {
        case 401:
          setError("Введен неправильный логин или пароль")
          console.log(username, password)
          break
        case 404:
          setError(
            `Запрос на авторизацию обработан, однако сервер не смог найти ответ, попробуйте зайти позже`,
          )
          break
        case 422:
          setError(
            `сервер успешно принял запрос, однако имеется какая-то логическая ошибка, из-за которой невозможно произвести операцию над ресурсом.`,
          )
          break
        default:
          setError(null)
          break
      }
    } finally {
      setIsLoading(false)
    }
  } */
