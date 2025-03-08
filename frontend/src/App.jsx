import "./App.css";
import AppRoute from "./routes/AppRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRoute />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
