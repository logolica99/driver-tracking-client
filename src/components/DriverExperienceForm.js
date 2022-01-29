import React, { useState, useContext, useEffect } from "react";
import { DriverExperienceContext } from "../context/DriverExperienceContext";
import DriverExperienceTable from "./DriverExperienceTable";
import AccidentTable from './AccidentTable'
import DriverExperienceCheckboxes from "./DriverExperienceCheckboxes";

export default function DriverExperienceForm() {
  const [state, dispatch] = useContext(DriverExperienceContext);

  const changeHandler = (fieldName, data) => {
    dispatch({
      type: "ADD_OBJECT_DATA",
      payload: {
        dataField: fieldName,
        data: data,
      },
    });
  };
  return (
    <div>
      <DriverExperienceTable />
      <AccidentTable/>
      <DriverExperienceCheckboxes/>
    
    </div>
  );
}
