import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EmployeeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("http://localhost:8088/employees")
            .then(res => res.json())
            .then(setEmployees)
    }

    const addEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees)
    }

    const removeEmployee = empId => {
        return fetch(`http://localhost:8088/employees/${empId}`, {
            method: "DELETE"
        })
        .then(getEmployees);
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EmployeeContext.Provider value={{
            employees, addEmployee, getEmployees, removeEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}