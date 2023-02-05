import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { NavBar } from './NavBar'
import { TodoList } from './TodoList'
import { HelloWorld } from './HelloWorld'

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
