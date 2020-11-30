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
        getLocations();
    }, [])

    useEffect(() => {
        getCustomers();
    }, [locations])

    useEffect(() => {
        getAnimals();
    }, [customers])

    return (
        <div className="animals">
            <h1>Animals</h1>
            <article className="animalList">
        {
            animals.map(ami => {
                const cust = customers.find(c => c.id === ami.customerId);
                const loc = locations.find(l => l.id === ami.locationId);
                return <Animal key={ami.id} location={loc} customer={cust} animal={ami} />
            })
        }
            </article>
        </div>
    )
}