import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing session, tokens)
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      {/* Navbar */}
      <nav className="p-4 bg-white shadow-md bg-opacity-90">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="text-3xl font-extrabold tracking-wide text-purple-800">
            Connectify
          </div>
          <div>
            <button
              className="px-6 py-2 text-white transition-colors bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1">
        <div className="text-center text-white">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Welcome to Connectify
          </h1>
          <p className="mb-8 text-lg">
            Connect with your friends and start chatting instantly. Stay
            connected, anytime, anywhere.
          </p>
          <a
            href="/chat"
            className="px-8 py-3 text-xl text-white transition-colors bg-purple-800 rounded-full hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Start Chatting
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-white bg-gray-800">
        <p className="text-sm">&copy; 2024 Connectify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
