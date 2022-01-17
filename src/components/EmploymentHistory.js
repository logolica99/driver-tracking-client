import React from "react";
import PrevEmployment from "./PrevEmployment";

const EmploymentHistory = ({
  rows,
  prevEmploymentFrom,
  setPrevEmploymentFrom,
  prevEmploymentTo,
  setPrevEmploymentTo,
  prevEmployerName,
  prevJobPosition,
  prevJobAddress,
  prevJobLeavingReason,
  prevCompanyMobileNum,
  setPrevCompanyMobileNum,
  prevCompanySubjectToFMCR,
  setPrevCompanySubjectToFMCR,
  prevCompanyDOTRegulation,
  setPrevCompanyDOTRegulation,
}) => {
  return (
    <>
      {rows.map((_, index) => {
        return (
          <PrevEmployment
            index={index}
            prevEmploymentFrom={prevEmploymentFrom}
            setPrevEmploymentFrom={setPrevEmploymentFrom}
            prevEmploymentTo={prevEmploymentTo}
            setPrevEmploymentTo={setPrevEmploymentTo}
            prevEmployerName={prevEmployerName}
            prevJobPosition={prevJobPosition}
            prevJobAddress={prevJobAddress}
            prevJobLeavingReason={prevJobLeavingReason}
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
