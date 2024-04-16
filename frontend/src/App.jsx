import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Signup from "./components/Auth/SignUp/Signup.jsx";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1> 404 page not found </h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
