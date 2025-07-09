import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const tasks = ["Sales", "Support", "Content", "Paper-work"];

export default function WorkSheet() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  const { data: workData = [], isLoading } = useQuery({
    queryKey: ["workData", user.uid],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employee-task/${user.uid}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    const newEntry = {
      task: data.task,
      hours: data.hours,
      date: selectedDate.toISOString(),
      userId: user.uid,
    };
    reset();
    setSelectedDate(new Date());

    console.log(newEntry);
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
                <td className="py-2 px-4 border">{item.date}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
