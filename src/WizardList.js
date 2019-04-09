import React from "react";
import Wizard from "./Wizard";

const WizardList = props => {


return(
  <div> {props.students.map(student => {
      return <Wizard name={student.name} house={student.house} key={student.name}/>
    })} </div>
)
};

export default WizardList;
