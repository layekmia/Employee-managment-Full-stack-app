import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditTaskModal({ isOpen, onClose, taskData, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  const [isUpdating, setIsUpdating] = useState(false);

  // Reset form values when taskData changes
  useEffect(() => {
    if (taskData) {
      reset({
        task: taskData.task || "",
        hours: taskData.hours || "",
        date: taskData.date
          ? new Date(taskData.date).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [taskData, reset]);

const handleFormSubmit = async (data) => {
  const updatedData = {
    ...data,
    date: new Date(data.date).toISOString(),
  };

  setIsUpdating(true);
  try {
    await onSubmit(taskData._id, updatedData);
    toast.success("Successfully updated");
    onClose();
    reset();
  } catch (error) {
    console.error(error);
    toast.error("Error updating task");
  } finally {
    setIsUpdating(false);
  }
};


  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div aria-hidden="true" />
      <div className="flex items-center bg-black/30 justify-center min-h-screen px-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 space-y-4 shadow-lg">
          <Dialog.Title className="text-xl font-semibold text-gray-800">
            Edit Task
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task</label>
              <select
                {...register("task", { required: true })}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              >
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hours</label>
              <input
                type="number"
                {...register("hours", { required: true })}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full border px-3 py-2 rounded focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
