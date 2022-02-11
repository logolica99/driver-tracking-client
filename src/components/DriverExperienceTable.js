import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
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

export default function DriverExperienceTable() {
  const [state, dispatch] = useContext(DriverExperienceContext);
  const [dates, setDates] = useState({
    straightTruck: {
      from: new Date().getTime(),
      to: new Date().getTime(),
      approximateNoOfMiles: 0,
    },
    tractorAndSemitrailers: {
      from: new Date().getTime(),
      to: new Date().getTime(),
      approximateNoOfMiles: 0,
    },
    tractorAndTwoTrailers: {
      from: new Date().getTime(),
      to: new Date().getTime(),
      approximateNoOfMiles: 0,
    },
    tractorAndTripleTrailers: {
      from: new Date().getTime(),
      to: new Date().getTime(),
      approximateNoOfMiles: 0,
    },
  });
  const [states, setStates] = useState("");
  const [specialTraining, setSpecialTraining] = useState("");
  const [awards, setAwards] = useState("");
  useEffect(() => {
    changeHandler("classOfEquipment", dates);
  }, [dates]);
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
      <div className="drivingExperience-title">
        <h2>Driving Experience</h2>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Class of Equipment </StyledTableCell>
              <TableCell align="center">From</TableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <TableCell align="center">Approximate Number of Miles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="From"
                      value={dates[row.field].from}
                      maxDate={new Date().getTime()}
                      onChange={(newValue) => {
                        setDates((prevData) => ({
                          ...prevData,
                          [row.field]: {
                            ...prevData[row.field],
                            from: newValue.getTime(),
                          },
                        }));
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="From"
                      value={dates[row.field].to}
                      minDate={dates[row.field].from}
                      maxDate={new Date().getTime()}
                      onChange={(newValue) => {
                        setDates((prevData) => ({
                          ...prevData,
                          [row.field]: {
                            ...prevData[row.field],
                            to: newValue.getTime(),
                          },
                        }));
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    required
                    type="number"
                    label="Miles"
                    onBlur={(event) => {
                      setDates((prevData) => ({
                        ...prevData,
                        [row.field]: {
                          ...prevData[row.field],
                          approximateNoOfMiles: event.target.value,
                        },
                      }));
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="drivingExperience-item">
        <p>
          List of states operated (Provide state names seperated by a comma. i.e
          (Cailfornia,Alabama,New Jersey)):
        </p>
        <TextField
          required
          fullWidth
          label = "Cailfornia,Alabama,New Jersey"
          onBlur={({ target: { value } }) => {
            var values = value.split(",").map(function (item) {
              return item.trim();
            });

            changeHandler("listOfStateOperated", values);
            setStates(value);
            if (/^[A-z A-z,.*]+$/.test(value)) {
            }
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <p>List special courses/training completed (PTD/DDC, HAZMAT, ETC):</p>
        <TextField
          
          fullWidth
          label="PTD/DDC, HAZMAT, ETC"
          onBlur={({ target: { value } }) => {
            var values = value.split(",").map(function (item) {
              return item.trim();
            });

            changeHandler("listOfSpecialTraining", values);
            setSpecialTraining(value);
            if (/^[A-z A-z,.*]+$/.test(value)) {
            }
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <p>
          List any Safe Driving Awards you hold and from whom ie. (Expert Driver
          Award(United States Postal Service)):
        </p>
        <TextField
          fullWidth
          
          onBlur={({ target: { value } }) => {
            var values = value.split(",").map(function (item) {
              return item.trim();
            });

            changeHandler("listOfDrivingAwards", values);
            setAwards(value);
            if (/^[A-z A-z,.*]+$/.test(value)) {
            }
          }}
        />
      </div>
    </div>
  );
}
