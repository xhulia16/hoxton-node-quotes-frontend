import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { RandomQuote } from "./pages/RandomQuote";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/random-quote" element={<RandomQuote />} />
      </Routes>

      
    </div>
  );
}

export default App;
