import React, { useContext, useRef, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Animal.css"

export const AnimalForm = (props) => {
    const { locations, getLocations } = useContext(LocationContext)
    const { addAnimal } = useContext(AnimalContext)

    const name = useRef(null)
    const location = useRef(null)

    useEffect(() => {
	   getLocations()
    }, [])

    const createNewAppointment = () => {

        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
			window.alert("Please select a location")
		} 
		else {
            addAnimal({
                name: name.current.value,
                locationId,
                customerId: parseInt(localStorage.getItem("kennel_customer"))
            })
            .then(() => props.history.push("/animals"))
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="animalName" ref={name} required autoFocus className="form-control" placeholder="Animal name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="animalLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    createNewAppointment()
                }}
                className="btn btn-primary">
                Save Appointment
            </button>
        </form>
    )
}