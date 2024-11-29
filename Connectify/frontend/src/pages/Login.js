import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "", // Use email instead of username
    password: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To show loading status
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(""); // Clear any errors when switching forms
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before submitting

    const apiUrl = isSignUp
      ? "http://localhost:5001/api/users/register"
      : "http://localhost:5001/api/users/login";

    try {
      const response = await axios.post(apiUrl, formData);

      setLoading(false);
      if (isSignUp) {
        alert("Registration successful!");
        setFormData({ email: "", password: "" });
      } else {
        alert("Login successful!");

        // Ensure the token is set in localStorage
        localStorage.setItem("token", response.data.token);

        // Debug the token storage to check if it's correctly set
        console.log("Token stored:", localStorage.getItem("token"));

        // Delay navigate to allow token to be set
        setTimeout(() => {
          navigate("/home");
        }, 500); // Add a slight delay before navigating
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mt-8 text-4xl font-semibold text-indigo-600">
        Connectify
      </h1>
      <div className="flex flex-col w-full max-w-4xl mt-6 overflow-hidden bg-white rounded-lg md:flex-row md:mt-12">
        {/* Form Panel */}
        <div className="w-full p-8 md:w-1/2">
          {/* Sign in Form */}
          {!isSignUp && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-gray-700">Sign in</h2>
              <div className="space-y-2">
                <input
                  type="email" // Changed to email input
                  name="email" // Changed to email field
                  value={formData.email} // Bind to email field
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  autocomplete="current-password" // Added autocomplete attribute
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          {/* Sign up Form */}
          {isSignUp && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-gray-700">Sign up</h2>
              <div className="space-y-2">
                <input
                  type="email" // Changed to email input
                  name="email" // Changed to email field
                  value={formData.email} // Bind to email field
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {loading ? "Loading..." : "Sign up"}
              </button>
            </form>
          )}
        </div>

        {/* Image Panel */}
        <div className="flex flex-col items-center justify-center w-full p-8 text-white bg-indigo-600 md:w-1/2">
          <h3 className="text-3xl font-semibold">Welcome</h3>
          <p className="mt-4 text-xl text-center md:text-left">
            Your go-to platform for building connections. Network, collaborate,
            and grow with Connectify.
          </p>
          <button
            onClick={toggleForm}
            className="px-6 py-3 mt-6 text-white transition bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-indigo-600"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "New here? Sign up"}
          </button>
          {/* Social Media Icons */}
          <div className="flex mt-6 space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-indigo-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-indigo-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-indigo-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-indigo-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
