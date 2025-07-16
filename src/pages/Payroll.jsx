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
import Spinner from "../components/Dashboard/Spinner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Checkout from "@/components/Dashboard/Checkout";

export default function PayrollPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosInstance.get("admin/employees/payment-requests");
      return res.data.payments;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="overflow-x-auto rounded-sm shadow mt-10">
        <Table hoverable striped className="min-w-[800px] w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell className="bg-blue-50">Name</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Salary</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Month</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Year</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Payment Date</TableHeadCell>
              <TableHeadCell className="bg-blue-50">Status</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.map((payment) => {
              const isPaid = payment.paymentStatus === "Paid";
              const paymentDate = payment.paymentDate
                ? new Date(payment.paymentDate).toLocaleDateString()
                : "Not Paid";

              return (
                <TableRow
                  key={payment._id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {payment.employeeName}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    {payment.salary} BDT
                  </TableCell>
                  <TableCell className="text-blue-400 uppercase font-medium">
                    {payment.month}
                  </TableCell>
                  <TableCell>{payment.year}</TableCell>
                  <TableCell
                    className={`${
                      paymentDate === "Not Paid" && "text-orange-500"
                    }`}
                  >
                    {paymentDate}
                  </TableCell>

                  <TableCell>
                    {isPaid ? (
                      <Badge color="success" className="w-fit">
                        Paid
                      </Badge>
                    ) : (
                      <Button
                        size="xs"
                        color="success"
                        onClick={() => {
                          setSelectedEmployee(payment);
                          setIsOpen(true);
                        }}
                        className="text-green-600 border border-green-500 hover:bg-green-50"
                      >
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {isOpen && (
        <Checkout
          setIsOpen={setIsOpen}
          selectedEmployee={selectedEmployee}
          refetch={refetch}
        />
      )}
    </>
  );
}
