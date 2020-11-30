import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { LocationList } from "./location/LocationList"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeDetail } from "./employee/EmployeeDetail"
import { LocationDetail } from "./location/LocationDetail"
import { AnimalDetail } from "./animal/AnimalDetail"


export const ApplicationViews = (props) => {
    return (
        <>
            <LocationProvider>
                <EmployeeProvider>
                    <AnimalProvider>
                        <Route exact path="/">
                            <LocationList />
                        </Route>
                        <Route path="/locations/:locationId(\d+)" render={
                            props => <LocationDetail {...props} />
                        } />
                    </AnimalProvider>
                </EmployeeProvider>
            </LocationProvider>
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route path="/animals/:animalId(\d+)" render={
                            props => <AnimalDetail {...props} />
                        } />
                        <Route exact path="/animals" render={
                            props => <AnimalList {...props} />
                        } />
                        <Route exact path="/animals/create" render={
                            props => <AnimalForm {...props} />
                        } />
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
            <EmployeeProvider>
                <LocationProvider>
                    <AnimalProvider>
                        <Route exact path="/employees" render={
                            props => <EmployeeList {...props} />
                        } />
                        <Route exact path="/employees/create" render={
                            props => <EmployeeForm {...props} />
                        } />
                        <Route path="/employees/:employeeId(\d+)" render={
                            props => <EmployeeDetail {...props} />
                        } />
                    </AnimalProvider>
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}