import React, { useState, createContext, useReducer } from "react";

export const VehicleIntventoryContext = createContext();
const initialState = {};

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



export const VehicleIntventoryContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <VehicleIntventoryContext.Provider value={[state,dispatch]}>
            {props.children}
        </VehicleIntventoryContext.Provider>
    )
};
