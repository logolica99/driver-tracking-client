import React, { useReducer, createContext } from "react";

export const ApplicantInformationContext = createContext();

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



export const ApplicantInformationContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <ApplicantInformationContext.Provider value={[state,dispatch]}>
            {props.children}
        </ApplicantInformationContext.Provider>
    )
};
