import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
    <ToastContainer autoClose={1000} />
  </>
);
