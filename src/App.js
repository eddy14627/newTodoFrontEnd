import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Todos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
