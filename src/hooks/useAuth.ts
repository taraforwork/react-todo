import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { apiUrl } from "../utils/const"
import { Credential } from "../types"

export const useAuth = () => {
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: async (user: Credential) =>
      await axios.post(`${apiUrl}/login`, user),

    onSuccess: () => {
      navigate("/todo")
    },
    onError: (error) => {
      console.error(error)
    },
  })
  const registerMutation = useMutation({
    mutationFn: async (user: Credential) =>
      await axios.post(`${apiUrl}/signup`, user),

    onError: (error) => {
      console.error(error)
    },
  })
  const logoutMutation = useMutation({
    mutationFn: async () => await axios.post(`${apiUrl}/logout`),
    onSuccess: () => {
      navigate("/")
    },
    onError: (error) => {
      console.error(error)
    },
  })
  return { loginMutation, registerMutation, logoutMutation }
}
