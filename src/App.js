import React, { Component } from "react";

import StorySettings from "./StorySettings";
import WizardList from "./WizardList";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      allStudents: [],
      filteredStudents: [],
      filter: "All",
      newWizardName: '',
      newWizardSpecies: '',
      newWizardGender: ''
    }
  }

  componentDidMount(){
    fetch('http://hp-api.herokuapp.com/api/characters/students')
    .then(resp => resp.json())
    .then(students => {
      this.setState({
        allStudents: students
      })
    })
  }

  handleFilterSelection = (e) => {
    let students;

    e.target.value === "All" ? students = this.state.allStudents : students = this.state.allStudents.filter(student => {
      return student.house === e.target.value
    })

    this.setState({
      filter: e.target.value,
      filteredStudents: students
    })
  }

  handleSubmit =(e) => {
    e.preventDefault();
    this.setState({
      allStudents: [...this.state.allStudents,
        {name: this.state.newWizardName,
        species: this.state.newWizardSpecies,
        gender: this.state.newWizardGender,
        house: e.target.newWizardHouse.value
      }]
    })
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h2>Harry Potter Fan Fiction Story Creator</h2>
        <StorySettings
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange} handleFilterSelection={this.handleFilterSelection}/>
        <WizardList students={this.state.filteredStudents}/>
      </div>
    );
  }
}

export default App;
