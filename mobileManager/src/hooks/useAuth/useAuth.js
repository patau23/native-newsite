import {AuthContext} from "../../contexts/authContext/context"
import {useContext} from "react"

export const useAuth = () => {
  return useContext(AuthContext)
}
