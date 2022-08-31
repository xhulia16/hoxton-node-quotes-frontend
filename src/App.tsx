import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { RandomQuote } from "./pages/RandomQuote";
import { SingleQuote } from "./pages/SingleQuote";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/quotes" />} />
        <Route path="/quotes" element={<Home/>} />
        <Route path="/random-quote" element={<RandomQuote />} />
        <Route path="/quotes/:itemId" element={<SingleQuote />} />
      </Routes>

      
    </div>
  );
}

export default App;
