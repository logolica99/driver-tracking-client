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
import { AuthContext } from "../context/AuthContext";

import RoadTestCertificates from "./RoadTestCertificates";
//firebase imports
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

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

export default function DriverLicenceTable() {
  const storage = getStorage();
  const [state, dispatch] = useContext(DriverExperienceContext);
  const [authState, authDispatch] = useContext(AuthContext);

  const [states, setStates] = useState([]);
  const [licences, setLicences] = useState([]);
  const [licenceUrl, setLicenceUrl] = useState([]);
  const [licenceFiles, setLicenceFiles] = useState([]);
  const [uploadedFileIndex, setUploadedFileIndex] = useState("");
  const [roadTestCertificateUrls, setRoadTestCertificateUrls] = useState([]);
  const [types, setTypes] = useState([]);
  const [endorsements, setEndorsements] = useState([]);
  const [dates, setDates] = useState([new Date().getTime()]);
  const [numberOfFields, setNumberOfFields] = useState([0]);

  //uploading image

  const changeHandler = (fieldName, data) => {
    dispatch({
      type: "ADD_OBJECT_DATA",
      payload: {
        dataField: fieldName,
        data: data,
      },
    });
  };
  const fileUploadHandler = (event, index) => {
    var temp = [...licenceFiles];
    temp[index] = event.target.files[0];
    setLicenceFiles(temp);
    setUploadedFileIndex(index);
  };

  useEffect(() => {
    changeHandler("driverLicenseList", {
      states: states,
      licences: licences,
      licenceUrl: licenceUrl,
      roadTestCertificateUrls: roadTestCertificateUrls,
      types: types,
      endorsements: endorsements,
      dates: dates,
    });
  }, [
    dates,
    types,
    endorsements,
    states,
    licenceUrl,
    licences,
    roadTestCertificateUrls,
  ]);

  //uploading image
  useEffect(() => {
    if (licenceFiles.length > 0) {
      authDispatch({
        type: "UPDATE_LOADING",
        payload: {
          loading: true,
        },
      });

      // licenceFiles.forEach((elem, index) => {
      var imageRef = ref(
        storage,
        `${authState.phoneNumber}/Licence${uploadedFileIndex}.jpg`
      );
      uploadBytes(imageRef, licenceFiles[uploadedFileIndex])
        .then((res) => {
          console.log("filed uploaded successfully");
          authDispatch({
            type: "UPDATE_LOADING",
            payload: {
              loading: false,
            },
          });
        })
        .then(() => {
          getDownloadURL(
            ref(
              storage,
              `${authState.phoneNumber}/Licence${uploadedFileIndex}.jpg`
            )
          ).then((url) => {
            var temp = [...licenceUrl];
            temp[uploadedFileIndex] = url;
            setLicenceUrl(temp);
          });
        });
      // });
    }
  }, [uploadedFileIndex]);

  return (
    <div className="drivingExperience-bigItem">
      <p style={{ fontWeight: "bold" }}>
        Driver’s License (list each driver’s license held in the past three(3)
        years:
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">State</StyledTableCell>
              <TableCell align="center">License</TableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <TableCell align="center">Endorsements</TableCell>
              <StyledTableCell align="center">Expiration Date</StyledTableCell>
              <TableCell align="center">Upload Licences</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numberOfFields.map((value, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                  required
                    label="State"
                    onBlur={(event) => {
                      var temp = [...states];
                      temp[index] = event.target.value;
                      setStates(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    label="License"
                    onBlur={(e) => {
                      var temp = [...licences];
                      temp[index] = e.target.value;
                      setLicences(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    label="Type"
                    onBlur={(e) => {
                      var temp = [...types];
                      temp[index] = e.target.value;
                      setTypes(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                  required
                    label="Endorsements"
                    onBlur={(e) => {
                      var temp = [...endorsements];
                      temp[index] = e.target.value;
                      setEndorsements(temp);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Expire Date"
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
                  <input
                    required
                    accept="image/*"
                    id="file-upload"
                    single="true"
                    type="file"
                    onChange={(e) => {
                      fileUploadHandler(e, index);
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

      <RoadTestCertificates
        roadTestCertificateUrls={roadTestCertificateUrls}
        setRoadTestCertificateUrls={setRoadTestCertificateUrls}
      />
    </div>
  );
}
