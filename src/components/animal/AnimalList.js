import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext);
    const { locations, getLocations } = useContext(LocationContext);
    const { customers, getCustomers } = useContext(CustomerContext);

    useEffect(() => {
        getAnimals();
        getLocations();
        getCustomers();
    }, [])

    return (
        <div className="animals">
        {
            animals.map(ami => {
                const cust = customers.find(c => c.id === ami.customerId);
                const loc = locations.find(l => l.id === ami.locationId);
                console.log(cust, loc);
                return <Animal key={ami.id} location={loc} customer={cust} animal={ami} />
            })
        }
        </div>
    )
}