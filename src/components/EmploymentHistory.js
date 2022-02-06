import React, { useState } from "react";
import { Button } from "@mui/material";
import PrevEmployment from "./PrevEmployment";

const EmploymentHistory = ({}) => {
  const [numberOfPrevEmployment, setNumberOfPrevEmployment] = useState([0]);
  const [prevEmploymentFrom, setPrevEmploymentFrom] = useState([""]);

  const [prevEmploymentTo, setPrevEmploymentTo] = useState([""]);

  const [prevEmployerName, setPrevEmployerName] = useState([""]);
  // const prevEmployerName = useRef(new Array());
  const [prevJobPosition, setPrevJobPosition] = useState([""]);
  // const prevJobPosition = useRef(new Array());
  const [prevJobAddress, setPrevJobAddress] = useState([""]);
  // const prevJobAddress = useRef(new Array());
  const [prevJobLeavingReason, setPrevJobLeavingReason] = useState([""]);
  // const prevJobLeavingReason = useRef(new Array());
  const [prevCompanyMobileNum, setPrevCompanyMobileNum] = useState([""]);

  const [prevCompanySubjectToFMCR, setPrevCompanySubjectToFMCR] = useState([
    "",
  ]);

  const [prevCompanyDOTRegulation, setPrevCompanyDOTRegulation] = useState([
    "",
  ]);

  return (
    <>
      <h2 className="employmentHistory-title">EMPLOYMENT HISTORY</h2>
      <p>
        Give a COMPLETE RECORD of all employment for the past three (3) years,
        including any unemployment or self employment periods, and all
        commercial driving experience for the past ten (10) years
      </p>
      {numberOfPrevEmployment.map((_, index) => {
        return (
          <div className="employmentHistory-item" key={index}>
            <PrevEmployment
              key={index}
              index={index}
              prevEmploymentFrom={prevEmploymentFrom}
              setPrevEmploymentFrom={setPrevEmploymentFrom}
              prevEmploymentTo={prevEmploymentTo}
              setPrevEmploymentTo={setPrevEmploymentTo}
              prevEmployerName={prevEmployerName}
              setPrevEmployerName={setPrevEmployerName}
              prevJobPosition={prevJobPosition}
              setPrevJobPosition={setPrevJobPosition}
              prevJobAddress={prevJobAddress}
              setPrevJobAddress={setPrevJobAddress}
              prevJobLeavingReason={prevJobLeavingReason}
              setPrevJobLeavingReason={setPrevJobLeavingReason}
              prevCompanyMobileNum={prevCompanyMobileNum}
              setPrevCompanyMobileNum={setPrevCompanyMobileNum}
              prevCompanySubjectToFMCR={prevCompanySubjectToFMCR}
              setPrevCompanySubjectToFMCR={setPrevCompanySubjectToFMCR}
              prevCompanyDOTRegulation={prevCompanyDOTRegulation}
              setPrevCompanyDOTRegulation={setPrevCompanyDOTRegulation}
            />
          </div>
        );
      })}
      <div className="employmentHistory-item">
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setNumberOfPrevEmployment((prev) => [...prev, 0]);
          }}
        >
          Add Field
        </Button>
      </div>
    </>
  );
};

export default EmploymentHistory;
