import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormData from "./components/FormData";
import HistoryMeasures from "./components/HistoryMeasures";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <Link to="/" className="mr-4 hover:underline">
            Formulário de Medição
          </Link>
          <Link to="/list" className="hover:underline">
            Histórico de Medições
          </Link>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<FormData />} />
            <Route path="/list" element={<HistoryMeasures />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
