import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/*<Route index element={} />*/}
            <Route path="*" element={<h1> 404 page not found </h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
