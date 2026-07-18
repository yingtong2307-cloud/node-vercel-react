import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeForm.css";

function EmployeeForm() {
  const buttonStyle1 = {
    backgroundColor: "#fb84ed",
    color: "#4a0880",
    borderRadius: "5px",
    padding: "10px 20px",
    border: "none",
    marginTop: "10px",
  };
  const buttonStyle2 = {
    backgroundColor: "#c384fb",
    color: "#160880",
    borderRadius: "5px",
    padding: "10px 20px",
    border: "none",
    marginTop: "10px",
  };
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    salary: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if employee ID already exists before submitting
      const checkResponse = await fetch("https://node-vercel-postgres-six.vercel.app/employees");
      const existingEmployees = await checkResponse.json();
      const isDuplicate = existingEmployees.some(
        (emp) => String(emp.id) === String(employee.id),
      );

      if (isDuplicate) {
        alert(
          `Error: Employee ID ${employee.id} already exists. Please enter a unique ID.`,
        );
        return;
      }

      const response = await fetch("https://node-vercel-postgres-six.vercel.app/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        alert("Employee saved successfully!");
        setEmployee({
          id: "",
          name: "",
          department: "",
          salary: "",
        });
      } else {
        alert("Failed to save employee. Please try again.");
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("An error occured while saving the employee. Please try again");
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 style={{ textAlign: "center" }}>Employee Data Entry Form</h1>
        <form onSubmit={handleSubmit}>
          {/* input for employee ID */}
          <div className="form-group">
            <label htmlFor="id">Employee ID</label>
            <br />
            <input
              type="text"
              id="id"
              name="id"
              value={employee.id}
              onChange={handleChange}
            />
          </div>
          {/* input for employee Name */}
          <div className="form-group">
            <label htmlFor="name">Employee Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          {/* input for Department */}
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <br />
            <input
              type="text"
              id="department"
              name="department"
              value={employee.department}
              onChange={handleChange}
            />
          </div>
          {/* input for Salary */}
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <br />
            <input
              type="text"
              id="salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" style={buttonStyle1}>
              Save Employee
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/emplist">
              <button type="button" style={buttonStyle2}>
                View Employee
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default EmployeeForm;
