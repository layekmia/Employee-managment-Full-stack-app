// import { useQuery } from "@tanstack/react-query";
// import { useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   createColumnHelper,
// } from "@tanstack/react-table";
// import axiosInstance from "../utils/axiosInstance";
// // import EmployeeRowActions from "./EmployeeRowActions"; // Uncomment & implement as needed

// export default function EmployeeList() {
//   const {
//     data: employees = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["employees"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/employees");
//       return res.data;
//     },
//   });

//   const columnHelper = createColumnHelper();

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("name", {
//         header: "Name",
//       }),
//       columnHelper.accessor("email", {
//         header: "Email",
//       }),
//       columnHelper.accessor("isVerified", {
//         header: "Verified",
//         cell: (info) => (
//           <span className="text-center">{info.getValue() ? "✅" : "❌"}</span>
//         ),
//       }),
//       columnHelper.accessor("bank_account_no", {
//         header: "Bank Account",
//       }),
//       columnHelper.accessor("salary", {
//         header: "Salary",
//       }),
//       columnHelper.display({
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => (
//           <div className="space-x-2">
//             {/* Example action buttons */}
//             <button
//               onClick={() => handleVerify(row.original)}
//               className="px-2 py-1 text-sm bg-green-500 text-white rounded"
//             >
//               Verify
//             </button>
//             <button
//               onClick={() => handlePay(row.original)}
//               className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
//             >
//               Pay
//             </button>
//           </div>
//         ),
//       }),
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: employees,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const handleVerify = (user) => {
//     console.log("Verify:", user);
//     // Call verify API + refetch
//   };

//   const handlePay = (user) => {
//     console.log("Pay:", user);
//     // Call pay API + refetch
//   };

//   if (isLoading) return <div className="text-center p-5">Loading...</div>;

//   return (
//     <div className="p-5">
//       <h2 className="text-xl font-bold mb-4">Employee List</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="p-3 text-left">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-3">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
