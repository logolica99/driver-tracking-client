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

export default function AccidentTable() {
  const [state, dispatch] = useContext(DriverExperienceContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date of Accident </StyledTableCell>
            <TableCell align="center">
              Nature of Accidents
              <span style={{ display: "block" }}>(Head on, rear end, etc)</span>
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
       
        </TableBody>
      </Table>
    </TableContainer>
  );
}
