import { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const fakePaymentData = Array.from({ length: 20 }, (_, i) => {
  const monthIndex = i % 12;
  const year = 2024 - Math.floor(i / 12);
  return {
    id: i + 1,
    monthYear: `${months[monthIndex]} ${year}`,
    amount: `${(5000 + i * 50).toFixed(2)} BDT`,
    transactionId: `TXN-${100000 + i}`,
  };
});
export default function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = fakePaymentData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(fakePaymentData.length / rowsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Month, Year</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((payment) => (
              <tr key={payment.id}>
                <td className="border px-4 py-2">{payment.monthYear}</td>
                <td className="border px-4 py-2">{payment.amount}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
