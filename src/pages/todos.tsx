import { FormEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid"
import { useAuth, useTodos } from "../hooks"
import { Todo as TodoType } from "../types"
import { Todo } from "../components"

export const Todos = () => {
  const queryClient = useQueryClient()
  const { get, create } = useTodos()
  const { logoutMutation } = useAuth()
  const [title, setTitle] = useState<TodoType["title"]>()
  const { data, isLoading } = get

  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title) return
    create.mutate({ title })
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries({ queryKey: ["todos"] })
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">Todos</span>
        <ArrowRightOnRectangleIcon
          onClick={logout}
          className="h-6 w-6 ml-3 text-blue-500 cursor-pointer"
        />
      </div>
      <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="your todo"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title ?? ""}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!title}
        >
          Create
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {data?.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  )
}
