
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="searchByname/:searchText" element={<Home/>}></Route>
      </Route>
      <Route path='login' element = {<Users type="login"/>}></Route>
      <Route path='signup' element = {<Users type="signup"/>}></Route>
      <Route path="secure" element={<Home/>}>
        <Route path="searchByname/:searchText" element={<Home/>}></Route>
      </Route>
      <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
    </Routes>
    
  );
}

export default App;
