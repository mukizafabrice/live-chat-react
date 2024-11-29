// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Adjust to match your project's file structure
  ],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
