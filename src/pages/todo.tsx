import { FC } from "react"
import { useAuth } from "../hooks"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"

export const Todos: FC = () => {
  const { logoutMutation } = useAuth()
  const logout = async () => {
    await logoutMutation.mutateAsync()
  }
  return (
    <div>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />
    </div>
  )
}
