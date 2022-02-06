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

export default function ConvictionsAndForfeituresTable() {
  const [state, dispatch] = useContext(DriverExperienceContext);
  const [dates, setDates] = useState([]);

  const [locations, setLocations] = useState([]);
  const [charges, setCharges] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [numberOfFields, setNumberOfFields] = useState([0]);

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
    changeHandler("trafficConvictionRecords", {
      dates: dates,
      locations: locations,
      charges: charges,
      penalites: penalties,
    });
  }, [dates, locations, charges, penalties, numberOfFields]);

  return (
    <div className="drivingExperience-bigItem">
      <p style={{ fontWeight: "bold" }}>
        Traffic Convictions and Forfeitures for the last three (3) years:
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <TableCell align="center">Location</TableCell>
              <StyledTableCell align="center">Charge</StyledTableCell>
              <TableCell align="center">Penalty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numberOfFields.map((value, index) => (
              <TableRow key={index}>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date"
                      value={dates[index]}
                      maxDate={new Date().getTime()}
                      onChange={(newValue) => {
                        var temp = [...dates];
                        temp[index] = newValue.getTime();
                        setDates(temp);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Location"
                    onBlur={(event) => {
                      var temp = [...locations];
                      temp[index] = event.target.value;
                      setLocations(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Charge"
                    onBlur={(e) => {
                      var temp = [...charges];
                      temp[index] = e.target.value;
                      setCharges(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Penalty"
                    type="number"
                    onBlur={(e) => {
                      var temp = [...penalties];
                      temp[index] = e.target.value;
                      setPenalties(temp);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="drivingExperience-item">

      <Button
        variant="contained"
        onClick={() => {
          setNumberOfFields((prevData) => [...prevData, 0]);
        }}
      >
        Add More Field
      </Button>
      </div>
    </div>
  );
}
