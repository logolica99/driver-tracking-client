import React, { useContext, useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../context/AuthContext";
import { getDatabase, ref, child, get } from "firebase/database";

export default function AuthPage() {
  const [state, dispatch] = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [exists, setExists] = useState(false);

  const checkIfNumberExists = () => {
    const dbRef = ref(getDatabase());
    dispatch({
      type: "UPDATE_LOADING",
      payload: {
        loading: true,
      },
    });

    get(child(dbRef, `users/${phoneNumber}`))
      .then((snapshot) => {
        dispatch({
          type: "UPDATE_LOADING",
          payload: {
            loading: false,
          },
        });

        if (snapshot.exists()) {
          setExists(true);
          dispatch({
            type:"UPDATE_SUCCESS_ADD",
            payload:{
              successfullyAdded:false
            }
          })
          dispatch({
            type: "ADD_USER",
            payload: {
              phoneNumber: phoneNumber,
              doesExist: true,
            },
          });
        } else {
          console.log("No data available");
          dispatch({
            type: "ADD_USER",
            payload: {
              phoneNumber: phoneNumber,
              doesExist: false,
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Auth">
      <p className="Auth-title">Please enter your phone number:</p>
      {exists && (
        <Box
          sx={{
            backgroundColor: "#fbe9e7",
            p: 3,
            width: 370,
            display: "flex",
            marginBottom: 4,
          }}
        >
          <WarningIcon color="error" />{" "}
          <Typography color="error" sx={{ marginLeft: 2, fontWeight: "bold" }}>
            A form have already submitted with this number
          </Typography>
        </Box>
      )}

      {state.successfullyAdded && (
        <Box
          sx={{
            backgroundColor: "#d1e7dd",
            p: 3,
            width: 370,
            display: "flex",
            marginBottom: 4,
          }}
        >
          <CheckCircleIcon color="success" />
          <Typography
            color="#0f5132"
            sx={{ marginLeft: 2, fontWeight: "bold" }}
          >
            The form has been submitted successfully!
          </Typography>
        </Box>
      )}
      <div className="Auth-item">
        <MuiPhoneNumber
          required
          name="phone"
          label="PHONE NUMBER"
          data-cy="user-phone"
          defaultCountry={"us"}
          value={phoneNumber}
          onBlur={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={checkIfNumberExists}
          sx={{ marginTop: 4 }}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
