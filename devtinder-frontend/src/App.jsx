import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";

function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/home" element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
