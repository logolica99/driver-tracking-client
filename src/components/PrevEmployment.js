import React, { useContext, useEffect } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, MenuItem } from "@mui/material";
import { PrevEmploymentContext } from "../context/PrevEmploymentContext";

const PrevEmployment = ({
  index,
  prevEmploymentFrom,
  setPrevEmploymentFrom,
  prevEmploymentTo,
  setPrevEmploymentTo,
  prevEmployerName,
  setPrevEmployerName,
  prevJobPosition,
  setPrevJobPosition,
  prevJobAddress,
  setPrevJobAddress,
  prevJobLeavingReason,
  setPrevJobLeavingReason,
  prevCompanyMobileNum,
  setPrevCompanyMobileNum,
  prevCompanySubjectToFMCR,
  setPrevCompanySubjectToFMCR,
  prevCompanyDOTRegulation,
  setPrevCompanyDOTRegulation,
}) => {
  const [state, dispatch] = useContext(PrevEmploymentContext);
  const changeHandler = () => {
    dispatch({
      type: "ADD_OBJECT_DATA",
      payload: {
        prevEmploymentFrom,

        prevEmploymentTo,

        prevEmployerName,

        prevJobPosition,

        prevJobAddress,

        prevJobLeavingReason,

        prevCompanyMobileNum,

        prevCompanySubjectToFMCR,

        prevCompanyDOTRegulation,
      },
    });
  };

  useEffect(() => {
    changeHandler();
  }, [
    prevEmploymentFrom,

    prevEmploymentTo,

    prevEmployerName,

    prevJobPosition,

    prevJobAddress,

    prevJobLeavingReason,

    prevCompanyMobileNum,

    prevCompanySubjectToFMCR,

    prevCompanyDOTRegulation,
  ]);

  return (
    <div>
      <div className="employmentHistory-item">
        <div className="employmentHistory-item-vertical">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="From"
              value={prevEmploymentFrom[index]}
              views={["year", "month"]}
              maxDate={new Date()}
              onChange={(newValue) => {
                var temp = [...prevEmploymentFrom];
                temp[index] = newValue.getTime();
                setPrevEmploymentFrom(temp);
              }}
              renderInput={(params) => <TextField  {...params} />}
            />
          </LocalizationProvider>
          <div className="employmentHistory-item-horizontal">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="To"
                value={prevEmploymentTo[index]}
                minDate={prevEmploymentFrom[index]}
                maxDate={new Date()}
                views={["year", "month"]}
                onChange={(newValue) => {
                  var temp = [...prevEmploymentTo];
                  temp[index] = newValue.getTime();
                  setPrevEmploymentTo(temp);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="employmentHistory-item">
        <TextField
          id="outlined-required"
          label="Present or Last Employer Name"
          //inputRef={(element) => (prevEmployerName.current[index] = element)}
          onBlur={(event) => {
            var temp = [...prevEmployerName];
            temp[index] = event.target.value;
            setPrevEmployerName(temp);
          }}
        />
      </div>
      <div className="employmentHistory-item">
        <TextField
          id="outlined-required"
          label="Position Held"
          //inputRef={(element) => (prevJobPosition.current[index] = element)}

          onBlur={(event) => {
            var temp = [...prevJobPosition];
            temp[index] = event.target.value;
            setPrevJobPosition(temp);
          }}
        />
      </div>
      <div className="employmentHistory-item">
        <TextField
          id="outlined-required"
          label="ADDRESS"
          //inputRef={(element) => (prevJobAddress.current[index] = element)}

          onBlur={(event) => {
            var temp = [...prevJobAddress];
            temp[index] = event.target.value;
            setPrevJobAddress(temp);
          }}
        />
      </div>
      <div className="employmentHistory-item">
        <TextField
          multiline
          fullWidth
          rows={4}
          id="outlined-required"
          label="Reason for leaving"
          //inputRef={(element) => (prevJobLeavingReason.current[index] = element)}

          onBlur={(event) => {
            var temp = [...prevJobLeavingReason];
            temp[index] = event.target.value;
            setPrevJobLeavingReason(temp);
          }}
        />
      </div>
      <div className="employmentHistory-item">
        <MuiPhoneNumber
          name="phone"
          label="Company phone"
          data-cy="user-phone"
          defaultCountry={"us"}
          value={prevCompanyMobileNum[index]}
          onBlur={(event) => {
            const temp = [...prevCompanyMobileNum];
            temp[index] = event.target.value;
            setPrevCompanyMobileNum(temp);
          }}
        />
      </div>
      <div className="employmentHistory-item">
        <FormControl component="fieldset" >
          <FormLabel component="legend">
            Were you subject to the FMCSRs while employed here?
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={prevCompanySubjectToFMCR[index]}
            onChange={(event) => {
              //  console.log(prevCompanySubjectToFMCR.current[index])
              var temp = [...prevCompanySubjectToFMCR];
              temp[index] = event.target.value;
              setPrevCompanySubjectToFMCR(temp);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="employmentHistory-item">
        <FormControl component="fieldset" >
          <FormLabel component="legend">
            Was your job designated as a safety-sensitive function in any DOT-
            regulated mode subject to the drug and alcohol testing requirements
            of 49 CFR Part 40?
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={prevCompanyDOTRegulation[index]}
            onChange={(event) => {
              var temp = [...prevCompanyDOTRegulation];
              temp[index] = event.target.value;
              setPrevCompanyDOTRegulation(temp);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
export default PrevEmployment;
