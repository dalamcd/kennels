import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import Animal from "./Animal"
import "./Animal.css"

export const AnimalList = (props) => {
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext);
    const { locations, getLocations } = useContext(LocationContext);
    const { customers, getCustomers } = useContext(CustomerContext);

    const [filteredAnimals, setFiltered] = useState([])

    useEffect(() => {
        getLocations();
    }, [])

    useEffect(() => {
        getCustomers();
    }, [locations])

    useEffect(() => {
        getAnimals();
    }, [customers])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all animals
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (
        <>
            <h1>Animals</h1>
            <button onClick={() => props.history.push("/animals/create")}>
                Make Reservation
            </button>
            <div className="animalList">
                {
                    filteredAnimals.map(animal => {
                        return <Animal key={animal.id} animal={animal} />
                    })
                }
            </div>
        </>
    )
}