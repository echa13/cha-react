import { createRoot } from "react-dom/client";
import "./tailwind.css";
import RegisterForm from "./RegisterForm";

createRoot(document.getElementById("root")).render(
  <div>
    <RegisterForm />
  </div>
);