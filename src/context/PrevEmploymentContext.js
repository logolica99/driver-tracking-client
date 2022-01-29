import React, { useState, createContext, useReducer } from "react";

export const PrevEmploymentContext = createContext();

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_OBJECT_DATA": {
      return action.payload;
    }
    default:
      return { ...state };
  }
};

export const PrevEmploymentContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PrevEmploymentContext.Provider value={[state, dispatch]}>
      {props.children}
    </PrevEmploymentContext.Provider>
  );
};
