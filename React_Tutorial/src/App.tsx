
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/a" element={<h1>Hello</h1>}></Route>
    </Routes>
    
  );
}

export default App;
