import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import Animal from "./Animal"
import "./Animal.css"

export const AnimalList = (props) => {
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
        <>
            <h1>Animals</h1>

            <button onClick={() => props.history.push("/animals/create")}>
                Make Reservation
            </button>
            <div className="animals">
                {
                    animals.map(animal => {
                        return <Animal key={animal.id} animal={animal} />
                    })
                }
            </div>
        </>
    )
}