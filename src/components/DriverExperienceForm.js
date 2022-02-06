import React, { useState, useContext, useEffect } from "react";
import { DriverExperienceContext } from "../context/DriverExperienceContext";
import DriverExperienceTable from "./DriverExperienceTable";
import AccidentTable from "./AccidentTable";
import ConvictionsAndForfeituresTable from "./ConvictionsAndForfeituresTable";
import DriverLicenceTable from './DriverLicenceTable'
import DriverExperienceCheckboxes from "./DriverExperienceCheckboxes";

export default function DriverExperienceForm() {
  return (
    <div>
      <DriverExperienceTable />
      <AccidentTable />
      <ConvictionsAndForfeituresTable />
      <DriverLicenceTable/>
      <DriverExperienceCheckboxes />
    </div>
  );
}
