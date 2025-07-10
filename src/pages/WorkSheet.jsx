import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import EditTaskModal from "../components/Dashboard/EmployeeTaskEdit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const tasks = ["Sales", "Support", "Content", "Paper-work"];

export default function WorkSheet() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    data: workData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["workData", user.uid],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employee-task/${user.uid}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const newEntry = {
      task: data.task,
      hours: Number(data.hours),
      date: selectedDate.toISOString(),
      userUID: user.uid,
    };
    reset();
    setSelectedDate(new Date());

    const res = await axiosInstance.post("/employee-task", newEntry);
    console.log(res.data);
    refetch();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Ary you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/employee-task/${id}`);
        toast.success("Deleted");
        refetch();
      } catch (error) {
        toast.error("Failed to delete", error.message);
      }
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    await axiosInstance.put(`/employee-task/${taskId}`, updatedData);
    refetch();
  };

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-4 mb-8"
      >
        <select
          {...register("task", { required: true })}
          className="border px-4 py-2 rounded w-full lg:w-auto"
        >
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task} value={task}>
              {task}
            </option>
          ))}
        </select>

        <input
          {...register("hours", { required: true })}
          type="number"
          placeholder="Hours Worked"
          className="border px-4 py-2 rounded w-full lg:w-auto"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border px-4 py-2 rounded w-full lg:w-auto"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="h-10 w-10 border-4 border-[#4361ee] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border">Task</th>
                <th className="text-left py-2 px-4 border">Hours</th>
                <th className="text-left py-2 px-4 border">Date</th>
                <th className="text-left py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{item.task}</td>
                  <td className="py-2 px-4 border">{item.hours}</td>
                  <td className="py-2 px-4 border">{item.date.slice(0, 10)}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {workData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No work data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <EditTaskModal
        isOpen={isOpen}
        onClose={onClose}
        taskData={selectedTask}
        onSubmit={handleUpdateTask}
      />
    </div>
  );
}
