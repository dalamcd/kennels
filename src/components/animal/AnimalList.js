import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)

    useEffect(() => {
        getAnimals()
    }, [])

    return (
        <div className="animals">
        {
            animals.map(ami => <Animal key={ami.id} animal={ami} />)
        }
        </div>
    )
}