import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useTheme() {
    const context = useContext(ThemeContext);
  return context
}