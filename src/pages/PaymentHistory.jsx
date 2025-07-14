// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../hook/useAuth";
// import axiosInstance from "../utils/axiosInstance";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
//   Badge,
// } from "flowbite-react";
// import { formatDate } from "../utils/helper";
// import Spinner from "../components/Dashboard/Spinner";

// export default function PaymentHistory() {
//   const { user } = useAuth();

//   const { data: paymentsHistory = [], isLoading } = useQuery({
//     queryKey: ["paymentHistory", user.uid],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/payment-history");
//       return res.data;
//     },
//   });

//   if (isLoading) return <Spinner />;

//   return (
//     <div className="overflow-x-auto mt-10">
//       <Table striped>
//         <TableHead>
//           <TableHeadCell className="bg-blue-50">payment Date</TableHeadCell>
//           <TableHeadCell className="bg-blue-50">Amount</TableHeadCell>
//           <TableHeadCell className="bg-blue-50">Transaction Id</TableHeadCell>
//           <TableHeadCell className="bg-blue-50">Status</TableHeadCell>
//         </TableHead>
//         <TableBody className="divide-y">
//           {paymentsHistory.map((payment) => (
//             <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//               <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                 {payment.paymentDate
//                   ? formatDate(new Date(payment.paymentDate))
//                   : "Processing"}
//               </TableCell>
//               <TableCell className="font-medium text-green-600">
//                 {payment.salary} TK
//               </TableCell>
//               <TableCell>{payment.transactionId || "--"}</TableCell>
//               <TableCell>
//                 {payment.paymentStatus === "Paid" ? (
//                   <Badge color="success" size="xs" className="w-fit">
//                     Paid
//                   </Badge>
//                 ) : (
//                   payment.paymentStatus
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from "flowbite-react";
import { formatDate } from "../utils/helper";
import Spinner from "../components/Dashboard/Spinner";

export default function PaymentHistory() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["paymentHistory", user.uid, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/payment-history?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;
  const { data: paymentsHistory, totalPages } = data;

  return (
    <div className="overflow-x-auto mt-10 px-4">
      <Table striped>
        <TableHead>
          <TableHeadCell className="bg-blue-50">Payment Date</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Amount</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Transaction Id</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Status</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {paymentsHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 dark:text-white text-gray-500">
                No payment history found.
              </TableCell>
            </TableRow>
          ) : (
            paymentsHistory.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-300">
                  {payment.paymentDate
                    ? formatDate(new Date(payment.paymentDate))
                    : "Processing"}
                </TableCell>
                <TableCell className="font-medium dark:text-green-400 text-green-600">
                  {payment.salary} TK
                </TableCell>
                <TableCell>{payment.transactionId || "--"}</TableCell>
                <TableCell>
                  {payment.paymentStatus === "Paid" ? (
                    <Badge color="success" size="xs" className="w-fit">
                      Paid
                    </Badge>
                  ) : (
                    <Badge color="warning" size="xs" className="w-fit">
                      {payment.paymentStatus}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center gap-4 mt-6 dark:text-white">
          <button
            size="xs"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 mt-1 dark:text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            size="xs"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
