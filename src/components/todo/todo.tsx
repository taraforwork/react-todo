import { FC, FormEvent, useState } from "react"
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Todo as TodoType } from "../../types"
import { useTodos } from "../../hooks"

type Props = {
  todo: Omit<TodoType, "created_at" | "updated_at">
}
export const Todo: FC<Props> = ({ todo: { id, title } }) => {
  const { remove, update } = useTodos()
  const [editedTitle, setEditedTitle] = useState<TodoType["title"]>(title)
  const [isEdit, setIsEdit] = useState(false)

  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update.mutate({ id, title: editedTitle })
    if (update.isSuccess) setIsEdit(false)
  }

  if (isEdit) {
    return (
      <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="your todo"
          type="text"
          onChange={(e) => setEditedTitle(e.target.value)}
          value={editedTitle}
        />
        <div className="flex float-right">
          <button
            className="disabled:opacity-40 ml-3  py-2 px-3 text-white bg-indigo-600 rounded"
            disabled={title === editedTitle || !editedTitle}
          >
            Update
          </button>
          <XMarkIcon
            className="h-10 w-6  text-blue-500 cursor-pointer"
            onClick={() => setIsEdit(false)}
          />
        </div>
      </form>
    )
  }

  return (
    <li className="my-3">
      <span className="font-bold">{title}</span>
      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => setIsEdit(true)}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            remove.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
