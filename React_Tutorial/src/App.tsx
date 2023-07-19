
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="search" element={<Home/>}></Route>
      </Route>
      <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
    </Routes>
    
  );
}

export default App;
