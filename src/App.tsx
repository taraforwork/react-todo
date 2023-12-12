import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Auth, Todo } from "./pages"

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
