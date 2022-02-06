import React, { useState, createContext, useReducer } from "react";

export const DriverExperienceContext = createContext();

const initialState = {
  classOfEquipment: {
    straightTruck: {},
    tractorAndSemitrailers: {},
    tractorAndTwoTrailers: {},
    tractorAndTripleTrailers: {},
  },
  listOfStateOperated: [],
  listOfSpecialTraining: [],
  listOfDrivingAwards: [],
  numberOfAccidents: 1,
  accidentRecords: {},
  trafficConvictionRecords: {},
  driverLicenseList: {},
  denialOfLicence: false,
  suspensionOfLicense: false,
  unableToPerform: false,
  felonyConviction: false,
  detailsAboutCrimes: {
    denialOfLicence: "",
    suspensionOfLicense: "",
    unableToPerform: "",
    felonyConviction: "",
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_OBJECT_DATA": {
      return {
        ...state,
        [action.payload.dataField]: action.payload.data,
      };
    }
    default:
      return { ...state };
  }
};

export const DriverExperienceContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DriverExperienceContext.Provider value={[state, dispatch]}>
      {props.children}
    </DriverExperienceContext.Provider>
  );
};
