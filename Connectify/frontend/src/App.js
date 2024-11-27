import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

// Importing components (optional, as needed by pages)
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Optional: Include Navbar component if needed on all pages */}
        <Navbar />

        {/* Routes to different pages */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login page */}
          <Route path="/home" element={<Home />} /> {/* Home page */}
          <Route path="/chat" element={<Chat />} /> {/* Chat page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
