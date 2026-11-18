export default function FormMessage({ type, message }) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`my-4 p-3.5 rounded-lg text-sm font-medium border ${
        isSuccess
          ? "bg-green-50 text-green-800 border-green-200"
          : "bg-red-50 text-red-800 border-red-200"
      }`}
    >
      {message}
    </div>
  );
}
