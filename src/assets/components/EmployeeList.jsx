import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://node-vercel-postgres-six.vercel.app/employees");
      const data = await response.json();

      // sort and arrange id in alphabetical and numerical order, cannot use after empId is changed to id
      // data.sort((a, b) => {
      //   const nameCompare = a.id.localeCompare(b.id);
      //   if (nameCompare !== 0) return nameCompare;
      //   return Number(a.id) - Number(b.id);
      // });

      // use this instead
      data.sort((a, b) => Number(a.id) - Number(b.id));
      
      // Safely copy and sort without mutating original state
      // const sortedData = [...data].sort((a, b) => {
      // return a.id.localeCompare(b.id, undefined, { numeric: true });
      // });

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return;
    <h2>Loading...</h2>;
  }

  // delete employee
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete " + id + " ?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://node-vercel-postgres-six.vercel.app/employees/${id}`,
          {
            method: "DELETE",
          },
        );
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <>
      <div className="list-container">
        <header>
          <h1>Employee List</h1>
        </header>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>${Number(employee.salary).toLocaleString()}</td>
                <td>
                  <Link to={`/edit/${employee.id}`}>
                    {/* <button>Edit</button> */}
                    <EditIcon />
                  </Link>
                  {/* onClick={() => handleDelete(employee.id)} */}
                  {/* <button style={{ marginLeft: "10px" }}>Delete</button> */}

                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions">
          <Link to="/" className="add-btn">
            {/* alternatively... <button onClick={() => navigate('/')}> */}
            <AddIcon /> Add New Employee
          </Link>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
