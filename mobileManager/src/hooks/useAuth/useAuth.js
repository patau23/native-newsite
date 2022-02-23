import {AuthContext} from "../../../App"
import {useContext} from "react"

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
