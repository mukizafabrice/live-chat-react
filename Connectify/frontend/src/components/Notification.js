// src/components/Notification.js
const Notification = ({ message, type, onClose }) => {
  // `type` can be 'success', 'error', or 'info'
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <span className="text-xl">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Notification;
