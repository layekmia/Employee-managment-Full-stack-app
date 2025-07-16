import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import EditTaskModal from "../components/Dashboard/Employee/EmployeeTaskEdit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Spinner from "../components/Dashboard/Spinner";
import { tasks } from "../utils/helper";
import useTheme from "@/hook/useTheme";

export default function WorkSheet() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { darkMode } = useTheme();

  const selectedMonth = selectedDate.toLocaleString("default", {
    month: "long",
  });

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
      employeeName: user.name,
      task: data.task,
      hours: Number(data.hours),
      date: selectedDate.toISOString(),
      month: selectedMonth,
    };

    try {
      await axiosInstance.post("/employee-task", newEntry);
      toast.success("Task added successfully!");
      reset();
      setSelectedDate(new Date());

      refetch();
    } catch (error) {
      console.error("Failed to submit task:", error);
      toast.error(
        error?.response?.data?.message || "Failed to add task. Try again."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: darkMode ? "#1f2937" : "#fff",
      color: darkMode ? "#f3f4f6" : "#111827",
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
    <div className="w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-4 mb-8"
      >
        <select
          {...register("task", { required: true })}
          className="border px-4 py-[6px] rounded w-full lg:w-auto dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500"
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
          className="border px-4 py-[6px] rounded w-full lg:w-auto dark:bg-gray-800 dark:border-gray-500"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border px-4 py-[6px] rounded w-full lg:w-auto dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500"
        />

        <button
          type="submit"
          className="bg-[#3b82f6] dark:bg-gray-600 text-white px-6 py-[6px] font-secondary font-medium rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Table */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-scroll">
          <Table striped className="min-w-[500px]">
            <TableHead>
              <TableRow>
                <TableHeadCell className="bg-[#266dfb10]">Task</TableHeadCell>
                <TableHeadCell className="bg-[#266dfb10]">Hours</TableHeadCell>
                <TableHeadCell className="bg-[#266dfb10]">Date</TableHeadCell>
                <TableHeadCell className="bg-[#266dfb10]">
                  Actions
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {workData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-4 font-medium text-gray-600 font-secondary"
                  >
                    You haven't added any tasks yet.
                  </TableCell>
                </TableRow>
              ) : (
                workData.map((item) => (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.task}
                    </TableCell>
                    <TableCell className="font-medium dark:text-green-400 text-green-600">
                      {item.hours}h
                    </TableCell>
                    <TableCell>{item.date.slice(0, 10)}</TableCell>
                    <TableCell className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-700 font-secondary font-medium hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 font-secondary font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
