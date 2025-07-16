export default function PasswordShowToggle({ showPassword, setShowPassword }) {
  return (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="h-[42px] dark:bg-gray-800 bg-white border-y border-r w-fit px-1 absolute right-0 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-semibold"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  );
}
