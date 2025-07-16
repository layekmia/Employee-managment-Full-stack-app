import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import PayModal from "../components/Dashboard/PayModal";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
  Button,
} from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { assets } from "../assets/assets";
import Spinner from "../components/Dashboard/Spinner";

export default function EmployeeList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["employees-payments"],
    queryFn: async () => {
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" });
      const year = today.getFullYear();

      const res = await axiosInstance.get(
        `/hr/employees-with-payments?month=${month}&year=${year}`
      );
      return res.data;
    },
  });

  const employees = data?.employees;
  const payments = data?.payments;

  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleVerify = async (user) => {
    try {
      await axiosInstance.patch(`/employee/${user._id}/verify`, {
        isVerified: !user.isVerified,
      });
      if (user.isVerified) {
        toast.warn(`${user.name} is Unverified`);
      } else {
        toast.success(`now MR ${user.name} is verified`);
      }
    } catch (error) {
      toast.error("Employee verify to failed", error.message);
    } finally {
      refetch();
    }
  };

  const handlePay = (user) => {
    setSelectedUser(user);
    setOpenPayModal(true);
  };
  const onClose = () => {
    setOpenPayModal(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="relative mt-10">
      <div className="overflow-x-auto ">
        <Table striped className="min-w-[1000px] w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell className="bg-[#266dfb10]">Name</TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">Email</TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">Verified</TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">
                Bank Account
              </TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">Salary</TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">Payment</TableHeadCell>
              <TableHeadCell className="bg-[#266dfb10]">Details</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {employees.map((employee, index) => {
              const isPaid = payments.some(
                (payment) => payment.employeeId === employee._id
              );
              return (
                <TableRow
                  index={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <button
                      className="text-xl"
                      onClick={() => handleVerify(employee)}
                    >
                      {employee.isVerified ? (
                        <img src={assets.checkIcon} />
                      ) : (
                        <RxCross2 className="text-red-600 font-bold" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>{employee.bank_account_no || "N/A"}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {employee.salary} TK
                  </TableCell>
                  <TableCell>
                    {isPaid ? (
                      <Badge color="success" className="w-fit">
                        Created
                      </Badge>
                    ) : (
                      <Button
                        size="xs"
                        color="success"
                        onClick={() => handlePay(employee)}
                        disabled={!employee.isVerified}
                        className="text-green-600 border border-green-500 hover:bg-green-50 dark:hover:bg-gray-900 dark:border-gray-400 dark:text-gray-300"
                      >
                        Make Request
                      </Button>
                    )}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/employee-list/${employee._id}`)
                      }
                      className="text-blue-700 font-secondary font-medium hover:underline"
                    >
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {openPayModal && (
        <PayModal user={selectedUser} onClose={onClose} refetch={refetch} />
      )}
    </div>
  );
}
