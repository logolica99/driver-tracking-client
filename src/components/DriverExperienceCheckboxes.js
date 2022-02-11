import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DriverExperienceContext } from "../context/DriverExperienceContext";
import { type } from "@testing-library/user-event/dist/type";

export default function DriverExperienceCheckboxes() {
  const [state, dispatch] = useContext(DriverExperienceContext);

  const [checkBoxData, setCheckBoxData] = useState({
    denialOfLicence: false,
    suspensionOfLicense: false,
    unableToPerform: false,
    felonyConviction: false,
  });
  const [detailsAboutCrimes, setDetailsAboutCrimes] = useState({
    denialOfLicence: "",
    suspensionOfLicense: "",
    unableToPerform: "",
    felonyConviction: "",
  });


  useEffect(()=>{
      changeHandler("denialOfLicence",checkBoxData.denialOfLicence);
      changeHandler("suspensionOfLicense",checkBoxData.suspensionOfLicense);
      changeHandler("unableToPerform",checkBoxData.unableToPerform);
      changeHandler("felonyConviction",checkBoxData.felonyConviction);
  },[checkBoxData])

  useEffect(()=>{
      changeHandler("detailsAboutCrimes",detailsAboutCrimes)
  },[detailsAboutCrimes])

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
      <div>
        <p>
          Have you ever been denied a license, permit or privilege to operate a
          motor vehicle?
        </p>
        <FormControl component="fieldset" required>
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={false}
            onClick={(e) => {
              var temp = false;
              if (e.target.value === "true") {
                temp = true;
              }
              setCheckBoxData((prevData) => ({
                ...prevData,
                denialOfLicence: temp,
              }));
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}

              label="Yes"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
       
              label="No"
            />
          </RadioGroup>
        </FormControl>
        {checkBoxData.denialOfLicence && (
          <DetailsAboutCrimes
            detailName="denialOfLicence"
            setDetailsAboutCrimes={setDetailsAboutCrimes}
          />
        )}
      </div>
      <div>
        <p>
          Has any license, permit or privilege ever been suspended or revoked?
        </p>
        <FormControl component="fieldset" required>
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={false}
            onClick={(e) => {
              var temp = false;
              if (e.target.value === "true") {
                temp = true;
              }
              setCheckBoxData((prevData) => ({
                ...prevData,
                suspensionOfLicense: temp,
              }));
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {checkBoxData.suspensionOfLicense && (
          <DetailsAboutCrimes
            detailName="suspensionOfLicense"
            setDetailsAboutCrimes={setDetailsAboutCrimes}
          />
        )}
      </div>
      <div>
        <p>
          Is there any reason you might be unable to perform the functions of
          the job for which you have applied (as described in the job
          description)?
        </p>
        <FormControl component="fieldset">
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={false}
            onClick={(e) => {
              var temp = false;
              if (e.target.value === "true") {
                temp = true;
              }
              setCheckBoxData((prevData) => ({
                ...prevData,
                unableToPerform: temp,
              }));
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {checkBoxData.unableToPerform && (
          <DetailsAboutCrimes
            detailName="unableToPerform"
            setDetailsAboutCrimes={setDetailsAboutCrimes}
          />
        )}
      </div>
      <div>
        <p>Have you ever been convicted of a felony?</p>
        <FormControl component="fieldset" required>
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={false}
            onClick={(e) => {
              var temp = false;
              if (e.target.value === "true") {
                temp = true;
              }
              setCheckBoxData((prevData) => ({
                ...prevData,
                felonyConviction: temp,
              }));
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {checkBoxData.felonyConviction && (
          <DetailsAboutCrimes
            detailName="felonyConviction"
            setDetailsAboutCrimes={setDetailsAboutCrimes}
          />
        )}
      </div>
    </div>
  );
}

const DetailsAboutCrimes = ({ detailName, setDetailsAboutCrimes }) => {
  return (
    <div>
      <p>Please Provide details:</p>
      <TextField
        
        id="outlined-multiline-static"
        label="Details"
        multiline
        fullWidth
        rows={4}
        onBlur={(e) => {
          setDetailsAboutCrimes((prevData) => ({
            ...prevData,
            [detailName]: e.target.value,
          }));
        }}
      />
    </div>
  );
};
