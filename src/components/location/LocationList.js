import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { Location } from "./Location"
import "./Location.css"

export const LocationList = () => {
    // This state changes when `getLocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)

    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        getLocations()
    }, [])

    return (
        <div className="locations">
            <h1>Locations</h1>
            <article className="locationList">
        {locations.map(loc => <Location key={loc.id} location={loc} />)}
        </article>
        </div>
    )
}