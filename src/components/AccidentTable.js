import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Button } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DriverExperienceContext } from "../context/DriverExperienceContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E6E6E6",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    color: "black",
  },
}));
const rows = [
  { name: "Straight Truck", field: "straightTruck" },
  { name: "Tractor & Semitrailer", field: "tractorAndSemitrailers" },
  { name: "Tractor & two trailers", field: "tractorAndTwoTrailers" },
  { name: "Tractor & triple trailers", field: "tractorAndTripleTrailers" },
];

export default function AccidentTable() {
  const [state, dispatch] = useContext(DriverExperienceContext);
  const [accidentDates, setAccidentDates] = useState([]);
  const [natureOfAccidents, setNatureOfAccidents] = useState([]);
  const [locationOfAccidents, setLocationOfAccidents] = useState([]);
  const [numberOfFatalities, setNumberOfFatalities] = useState([]);
  const [numberOfPeopleInjured, setNumberOfPeopleInjured] = useState([]);
  const [numberOfAccident, setNumberOfAccident] = useState([0]);

  const changeHandler = (fieldName, data) => {
    dispatch({
      type: "ADD_OBJECT_DATA",
      payload: {
        dataField: fieldName,
        data: data,
      },
    });
  };
  useEffect(() => {
    changeHandler("numberOfAccidents", numberOfAccident.length);
  }, [numberOfAccident]);

  useEffect(() => {
    changeHandler("accidentRecords", {
      accidentDates: accidentDates,
      natureOfAccidents: natureOfAccidents,
      locationOfAccidents: locationOfAccidents,
      numberOfFatalities: numberOfFatalities,
      numberOfPeopleInjured: numberOfPeopleInjured,
    });
  }, [
    accidentDates,
    natureOfAccidents,
    locationOfAccidents,
    numberOfFatalities,
    numberOfPeopleInjured,
  ]);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>
        Accident Record for past three (3) years:{" "}
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Date of Accident{" "}
              </StyledTableCell>
              <TableCell align="center">
                Nature of Accidents
                <span style={{ display: "block" }}>
                  (Head on, rear end, etc)
                </span>
              </TableCell>
              <StyledTableCell align="center">
                Location of Accident
              </StyledTableCell>
              <TableCell align="center"># of Fatalities</TableCell>
              <StyledTableCell align="center">
                # of People Injured
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numberOfAccident.map((value, index) => (
              <TableRow>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      value={accidentDates[index]}
                      maxDate={new Date()}
                      onChange={(newValue) => {
                        var temp = [...accidentDates];
                        temp[index] = newValue;
                        setAccidentDates(temp);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(event) => {
                      var temp = [...natureOfAccidents];
                      temp[index] = event.target.value;
                      setNatureOfAccidents(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => {
                      var temp = [...locationOfAccidents];
                      temp[index] = e.target.value;
                      setLocationOfAccidents(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    onChange={(e) => {
                      var temp = [...numberOfFatalities];
                      temp[index] = e.target.value;
                      setNumberOfFatalities(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    onChange={(e) => {
                      var temp = [...numberOfPeopleInjured];
                      temp[index] = e.target.value;
                      setNumberOfPeopleInjured(temp);
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={() => {
          setNumberOfAccident((prevData) => [...prevData, 0]);
        }}
      >
        Add Field
      </Button>
    </div>
  );
}
