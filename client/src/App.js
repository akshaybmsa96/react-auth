import "./App.css";
import { Login } from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/homePage/Home";
import { Register } from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
