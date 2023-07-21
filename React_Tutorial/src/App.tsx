
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="search/:searchText" element={<Home/>}></Route>
      </Route>
      <Route path='login' element = {<LoginPage/>}></Route>
      <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
    </Routes>
    
  );
}

export default App;
