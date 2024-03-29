
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import GameInfo from "./components/GameInfo";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="searchByname/:searchText" element={<Home/>}></Route>
      </Route>
      <Route path="gameDetail/:gameId/:gameName" element={<GameInfo />}></Route>
      <Route path='userCenter' element = {<Users type="login"/>}></Route>
      <Route path='createAccount' element = {<Users type="signup"/>}></Route>
      <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
    </Routes>
    
  );
}

export default App;
