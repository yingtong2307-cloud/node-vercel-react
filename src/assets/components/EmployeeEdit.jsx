import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    department: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://node-vercel-postgres-six.vercel.app/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setEmployee(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        alert("Error loading employee data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      // Ensure numeric inputs are stored as numbers
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://node-vercel-postgres-six.vercel.app/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        },
      );
      if (response.ok) {
        alert("Employee updated successfully!");
        navigate("/emplist");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          `Failed to update employee: ${errorData.message || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("A network error occurred while updating the employee.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Employee ID (cannot be edited)</label>
          <input
            type="text"
            id="id"
            name="id"
            value={employee.id}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="name">Employee Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EmployeeEdit;
