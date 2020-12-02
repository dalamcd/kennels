import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { Link } from "react-router-dom"
import "./Employee.css"

export const EmployeeList = (props) => {
    const { employees, getEmployees, removeEmployee } = useContext(EmployeeContext)

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <div className="employees">
            <h1>Employees</h1>

            <button onClick={() => props.history.push("/employees/create")}>
                Add Employee
            </button>

            <article className="employeeList">
                {
                    employees.map(employee => {
                        return <section className="employee">
                        <Link key={employee.id} to={`/employees/${employee.id}`}>
                            <h3>{employee.name}</h3>
                        </Link>
                            <button onClick={() => removeEmployee(employee.id)}>
                                Remove Employee</button>
                        </section>
                    })
                }
            </article>
        </div>
    )
}