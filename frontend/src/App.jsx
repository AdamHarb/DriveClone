import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="*" element={<h1> 404 page not found </h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
