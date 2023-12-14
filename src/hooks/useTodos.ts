import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Todo } from "../types"
import { apiUrl } from "../utils/const"

export const useTodos = () => {
  const queryClient = useQueryClient()

  const get = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: Infinity,
  })

  const create = useMutation({
    mutationFn: createTodos,
    onSuccess: (res) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"])
      if (previousTodos) {
        queryClient.setQueryData(["todos"], [...previousTodos, res.data])
      }
    },
    onError: (error) => console.error(error),
  })

  const update = useMutation({
    mutationFn: updateTodos,
    onSuccess: (res, variables) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"])
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.map((todo) =>
            todo.id === variables.id ? res.data : todo
          )
        )
      }
    },
    onError: (error) => console.error(error),
  })

  const remove = useMutation({
    mutationFn: removeTodos,
    onSuccess: (_, variables) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"])
      if (previousTodos) {
        queryClient.setQueryData(
          ["todos"],
          previousTodos.filter((todo) => todo.id !== variables)
        )
      }
    },
    onError: (error) => console.error(error),
  })

  return { get, create, update, remove }
}

const getTodos = async () => {
  const { data } = await axios.get<Todo[]>(`${apiUrl}/todos`, {
    withCredentials: true,
  })
  return data
}

const createTodos = async (
  todo: Omit<Todo, "id" | "created_at" | "updated_at">
) => await axios.post<Todo>(`${apiUrl}/todos`, todo)

const updateTodos = async (todo: Omit<Todo, "created_at" | "updated_at">) =>
  await axios.put<Todo>(`${apiUrl}/todos/${todo.id}`, {
    title: todo.title,
  })

const removeTodos = async (id: Todo["id"]) =>
  await axios.delete(`${apiUrl}/todos/${id}`)
