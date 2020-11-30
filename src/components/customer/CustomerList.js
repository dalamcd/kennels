import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <div className="customers">
            <h1>Customers</h1>
            <article className="customerList">
        {customers.map(cust => <Customer key={cust.id} customer={cust} />)}
            </article>
        </div>
    )
}