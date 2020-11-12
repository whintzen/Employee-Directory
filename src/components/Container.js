// This is the bulk of the coding for the application
import API from "../utils/API";
import React, { Component } from "react"
import SearchBox from "./SearchBox"
import TableData from "./TableData"
import "./style.css";

class Container extends Component {

    // Setting the component's initial state
    //search starts as an empty string
    //employees and filteredEmployees are empty arrays because that is the structure of the data we'll be working with
    //order is to reference the order that the employees are. By default they come randomly and the first click will trigger then to be in asc order
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""

    };

    // this is the initialization, what do you want the page to display when page it's first loaded
    componentDidMount() {
        API.getUsers().then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    //if "name" is clicked employee are shown by asc/desc order

    sortByName = () => {
        const filtered = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            console.log(sorted)

            this.setState({
                filteredEmployees: sorted,
                order: "desc"
            })
        } else {

            const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            console.log(sorted)

            this.setState({
                filteredEmployees: sorted,
                order: "asc"
            })

        }
    }
    //when input is changing it will dynamically show the associates names that match in the screen
    handleInputChange = event => {

        const employees = this.state.employees;
        const UserInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
        )
        this.setState({
            //change the state of filteredEmployees now it holds all the employees that matches users
            // search and will be passed down in this state

            filteredEmployees,

        });
    };


    //API call triggered when page it's refreshed and  when application it's loaded 
    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({

                // change both states to hold all the data from the API call(all employess) and will be passed down trough props like that
                // employee will remain the same and filteredEmployees will be changed and passed down during application's life.
                // Employee will always hold all employess.
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))
    }

     render() {

        return (
            <div>

                <SearchBox
                    employee={this.state.employees}                    
                    handleInputChange={this.handleInputChange} />
                <TableData results={this.state.filteredEmployees}
                    sortByName={this.sortByName}

                />
            </div >


        )
    }
}

export default Container