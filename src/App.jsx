//import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeeForm from "./assets/components/EmployeeForm";
import EmployeeList from "./assets/components/EmployeeList";
import EmployeeEdit from "./assets/components/EmployeeEdit";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Employee Data Handling</h1>
      <hr />
      <div>
        <Routes>
          <Route path="/" element={<EmployeeForm />} />
          <Route path="/emplist" element={<EmployeeList />} />
          <Route path="/edit/:id" element={<EmployeeEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
