import React, { useContext, useRef, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Animal.css"

export const AnimalForm = (props) => {
    const { locations, getLocations } = useContext(LocationContext);
    const { animals, getAnimals, addAnimal, updateAnimal } = useContext(AnimalContext);

    const [animal, setAnimal] = useState({})

    const editMode = props.match.params.hasOwnProperty("animalId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newAnimal = Object.assign({}, animal)
        newAnimal[event.target.name] = event.target.value
        setAnimal(newAnimal)
    }

    const getAnimalInEditMode = () => {
        if (editMode) {
            const animalId = parseInt(props.match.params.animalId)
            const selectedAnimal = animals.find(a => a.id === animalId) || {}
            setAnimal(selectedAnimal)
        }
    }

    useEffect(() => {
        getAnimals();
        getLocations();
    }, [])

    useEffect(() => {
        getAnimalInEditMode()
    }, [animals])

    const createNewAppointment = () => {

        const locationId = parseInt(animal.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            } else {
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{editMode ? "Update Animal" : "Add Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" name="name" autoFocus className="form-control" placeholder="Animal name"
                        defaultValue={animal.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal name: </label>
                    <input type="text" name="breed" className="form-control" placeholder="Animal breed" 
                        defaultValue={animal.breed} onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" 
                    onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Treatments: </label>
                    <textarea type="text" name="treatment" className="form-control"
                        proptype="varchar"
                        value={animal.treatment}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    createNewAppointment()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    )
}