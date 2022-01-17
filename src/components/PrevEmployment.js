import React from "react";
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



const PrevEmployment = ({
  index,
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
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="From"
          value={prevEmploymentFrom[index]}
          // value={prevEmploymentFrom.current[index].value}

          // inputRef={prevEmploymentFrom.current[index]}
          views={["year", "month"]}
          maxDate={new Date()}
          onChange={(newValue) => {
            console.log(newValue);

            var temp = [...prevEmploymentFrom];
            temp[index] = newValue;
            setPrevEmploymentFrom(temp);
            // prevEmploymentFrom.current[index].value = newValue;
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="To"
          value={prevEmploymentTo[index]}
          minDate={prevEmploymentFrom[index]}
          maxDate={new Date()}
          views={["year", "month"]}
          onChange={(newValue) => {
            var temp = [...prevEmploymentTo];
            temp[index] = newValue;
            setPrevEmploymentTo(temp);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        id="outlined-required"
        label="Present or Last Employer Name"
        //value={prevEmployerName[index]}
        inputRef={(element) => (prevEmployerName.current[index] = element)}
        // onChange={(event) => {

        //   //   var temp = [...prevEmployerName];
        //   //   temp[index] = event.target.value;
        //   //   setPrevEmployerName(temp);
        // }}
      />
      <TextField
        id="outlined-required"
        label="Position Held"
        inputRef={(element) => (prevJobPosition.current[index] = element)}
        // value={prevJobPosition[index]}
        // onChange={(event) => {
        //   var temp = [...prevJobPosition];
        //   temp[index] = event.target.value;
        //   setPrevJobPosition(temp);
        // }}
      />
      <TextField
        id="outlined-required"
        label="ADDRESS"
        inputRef={(element) => (prevJobAddress.current[index] = element)}
        // value={prevJobAddress[index]}
        // onChange={(event) => {
        //   var temp = [...prevJobAddress];
        //   temp[index] = event.target.value;
        //   setPrevJobAddress(temp);
        // }}
      />
      <TextField
        multiline
        rows={4}
        id="outlined-required"
        label="Reason for leaving"
        inputRef={(element) => (prevJobLeavingReason.current[index] = element)}
        // value={prevJobLeavingReason[index]}
        // onChange={(event) => {
        //   var temp = [...prevJobLeavingReason];
        //   temp[index] = event.target.value;
        //   setPrevJobLeavingReason(temp);
        // }}
      />
      <MuiPhoneNumber
        name="phone"
        label="Company phone"
        data-cy="user-phone"
        defaultCountry={"us"}
        value={prevCompanyMobileNum[index]}
        // inputRef={(element) => (number.current[index] = element)}
        onChange={(event) => {
          console.log(event);
          const temp = [...prevCompanyMobileNum];
          temp[index] = event;
          setPrevCompanyMobileNum(temp);
        }}
      />

      <FormControl component="fieldset" required>
        <FormLabel component="legend">
          Were you subject to the FMCSRs while employed here?
        </FormLabel>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          // inputRef={(element) =>
          //   (prevCompanySubjectToFMCR.current[index] = element)
          // }
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
      <FormControl component="fieldset" required>
        <FormLabel component="legend">
          Was your job designated as a safety-sensitive function in any DOT-
          regulated mode subject to the drug and alcohol testing requirements of
          49 CFR Part 40?
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
  );
};
export default PrevEmployment;
