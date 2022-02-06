import React, { useReducer, createContext } from "react";

export const AuthContext = createContext();

const initialState = {
  phoneNumber: "",
  doesExist: true,
  successfullyAdded: false,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        doesExist: action.payload.doesExist,
      };
    }
    case "REMOVE_USER": {
      return {
        ...state,
        phoneNumber: "",
        doesExist: true,
        successfullyAdded: true,
      };
    }
    case "UPDATE_LOADING": {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
    case "UPDATE_SUCCESS_ADD":{
      return{
        ...state,
        successfullyAdded:action.payload.successfullyAdded
      }
    }

    default:
      return { ...state };
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};
