import { useState } from "react";
import { toast } from "react-toastify";

export default function SalaryInput({ user, onUpdate }) {
  const [salaryUpdate, setSalaryUpdate] = useState(user.salary);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setSalaryUpdate(newValue);

    if (newValue < user.salary) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleUpdate = async () => {
    if (error) {
      toast.error("Salary cannot be decreased!");
      return;
    }

    try {
      await onUpdate(user._id, salaryUpdate);
      toast.success("Salary updated successfully!");
    } catch (err) {
      toast.error("Failed to update salary");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className={`w-24 border px-2 py-1 rounded ${
          error ? "border-red-500 border-2" : ""
        }`}
        defaultValue={user.salary}
        onChange={handleChange}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Update
      </button>
    </div>
  );
}
