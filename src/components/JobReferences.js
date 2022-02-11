import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";

export default function JobReferences({
  jobRefererName,
  setJobRefererName,
  jobRefererAddress,
  setJobRefererAddress,
  jobRefererNumber,
  setJobRefererNumber,
}) {
  return (
    <div>
      <h2 className="applicantInfo-title">Job References</h2>
      <p style={{ fontWeight: "bold" }}>
        List three (3) persons for references, other than family members, who
        have knowledge of your safety habits.{" "}
      </p>
      <div className="drivingExperience-item-vertical">
        <TextField
          required
          label="Name"
          onBlur={(e) => {
            var temp = [...jobRefererName];
            temp[0] = e.target.value;
            setJobRefererName(temp);
          }}
        />
        <div className="drivingExperience-item-horizontal">
          <TextField
            required
            label="Address"
            onBlur={(e) => {
              var temp = [...jobRefererAddress];
              temp[0] = e.target.value;
              setJobRefererAddress(temp);
            }}
          />
        </div>
        <div className="drivingExperience-item-horizontal">
          <MuiPhoneNumber
            required
            name="phone"
            label="Phone"
            data-cy="user-phone"
            defaultCountry={"us"}
            value={jobRefererNumber[0]}
            onBlur={(event) => {
              const temp = [...jobRefererNumber];
              temp[0] = event.target.value;
              setJobRefererNumber(temp);
            }}
          />
        </div>
      </div>
      <div className="drivingExperience-item-vertical">
        <TextField
          required
          label="Name"
          onBlur={(e) => {
            var temp = [...jobRefererName];
            temp[1] = e.target.value;
            setJobRefererName(temp);
          }}
        />
        <div className="drivingExperience-item-horizontal">
          <TextField
            required
            label="Address"
            onBlur={(e) => {
              var temp = [...jobRefererAddress];
              temp[1] = e.target.value;
              setJobRefererAddress(temp);
            }}
          />
        </div>
        <div className="drivingExperience-item-horizontal">
          <MuiPhoneNumber
            required
            name="phone"
            label="Phone"
            data-cy="user-phone"
            defaultCountry={"us"}
            value={jobRefererNumber[1]}
            onBlur={(event) => {
              const temp = [...jobRefererNumber];
              temp[1] = event.target.value;
              setJobRefererNumber(temp);
            }}
          />
        </div>
      </div>
      <div className="drivingExperience-item-vertical">
        <TextField
          required
          label="Name"
          onBlur={(e) => {
            var temp = [...jobRefererName];
            temp[2] = e.target.value;
            setJobRefererName(temp);
          }}
        />
        <div className="drivingExperience-item-horizontal">
          <TextField
            required
            label="Address"
            onBlur={(e) => {
              var temp = [...jobRefererAddress];
              temp[2] = e.target.value;
              setJobRefererAddress(temp);
            }}
          />
        </div>
        <div className="drivingExperience-item-horizontal">
          <MuiPhoneNumber
            required
            name="phone"
            label="Phone"
            data-cy="user-phone"
            defaultCountry={"us"}
            value={jobRefererNumber[2]}
            onBlur={(event) => {
              const temp = [...jobRefererNumber];
              temp[2] = event.target.value;
              setJobRefererNumber(temp);
            }}
          />
        </div>
      </div>
    </div>
  );
}
