import { useState } from 'react'
import Admin from './adminPage/Admin'
import Login from './login/login'
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom/dist'

function App() {
  const [isAuthentice,setIsAuthentice] = useState(false) ;
  return (
    <BrowserRouter>
    <Routes>
      <Route element={isAuthentice ? <Navigate to="/adminPanel"/> : <Login setIsAuthentice={setIsAuthentice}/>} path="/"/>
      <Route element={!isAuthentice ? <Navigate to="/" /> : <Admin/>} path="/adminPanel"/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
