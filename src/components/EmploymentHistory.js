import React, { useState } from "react";
import PrevEmployment from "./PrevEmployment";

const EmploymentHistory = ({ numberOfPrevEmployment }) => {
  // prevEmploymentFrom,
  // setPrevEmploymentFrom,
  // prevEmploymentTo,
  // setPrevEmploymentTo,
  // prevEmployerName,
  // setPrevEmployerName,
  // prevJobPosition,
  // setPrevJobPosition,
  // prevJobAddress,
  // setPrevJobAddress,
  // prevJobLeavingReason,
  // setPrevJobLeavingReason,
  // prevCompanyMobileNum,
  // setPrevCompanyMobileNum,
  // prevCompanySubjectToFMCR,
  // setPrevCompanySubjectToFMCR,
  // prevCompanyDOTRegulation,
  // setPrevCompanyDOTRegulation,

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
  // const index = 0;
  // const [numberOfPrevEmployment, setNumberOfPrevEmployment] = useState([0]);

  return (
    <>
      {numberOfPrevEmployment.map((_, index) => {
        return (
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
        );
      })}
    </>
  );
};

export default EmploymentHistory;
