import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Restaurant from "./pages/Restaurant/Restaurant";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/restaurant" element={<Restaurant/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
