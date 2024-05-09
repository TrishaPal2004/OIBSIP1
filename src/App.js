import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Success from "./components/Success"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/another-page" element={<Success/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
