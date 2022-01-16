import "./App.css";
import "./firebaseConfig";
import { useState, useRef } from "react";
import { Grid, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField, MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import MuiPhoneNumber from "material-ui-phone-number";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

//firebase import

import { getStorage, uploadBytes, ref } from "firebase/storage";

function App() {
  //firebase initialization

  const storage = getStorage();

  //// firebase storage image reference

  //states

  const [certificates, setCertificates] = useState([]);
  const [presentDate, setPresentDate] = useState(new Date());
  const [jobPosition, setJobPosition] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState();
  const [birthDate, setBirthDate] = useState();
  const [ss, setSS] = useState("");
  const [physicalExamExpirationDate, setPhysicalExamExpirationDate] =
    useState();

  const [firstAddress, setFirstAddress] = useState("");
  const [firstAdressFrom, setFirstAddressFrom] = useState("");
  const [firstAddressTo, setFirstAdressTo] = useState("");

  const [secondAddress, setSecondAddress] = useState("");
  const [secondAddressFrom, setSecondAddressFrom] = useState("");
  const [secondAddressTo, setSecondAddressTo] = useState("");

  const [thirdAddress, setThirdAddress] = useState("");
  const [thirdAddressFrom, setThirdAddressFrom] = useState("");
  const [thirdAddressTo, setThirdAddressTo] = useState("");

  const [previousWorkInTheCompany, setPreviousWorkInTheCompany] = useState();
  const [previousWorkFrom, setPreviousWorkFrom] = useState(new Date());
  const [previousWorkTo, setPreviousWorkTo] = useState();
  const [reasonForLeaving, setReasonForLeaving] = useState("");

  const [gradeSchoolStudied, setGradeSchoolStudied] = useState("");
  const [collegeStudied, setCollegeStudied] = useState("");
  const [postGradStudied, setPostGradStudied] = useState("");

  const [rows, setRows] = useState([0, 1, 2, 3, 4]);
  const inputRef = useRef(new Array());

  const [numberOfPrevEmployment, setNumberOfPrevEmployment] = useState(7);
  const [prevEmploymentFrom, setPrevEmploymentFrom] = useState([]);
  const [prevEmploymentTo, setPrevEmploymentTo] = useState([]);
  const [prevEmployerName, setPrevEmployerName] = useState([]);
  const [prevJobPosition, setPrevJobPosition] = useState([]);
  const [prevJobAddress, setPrevJobAddress] = useState([]);
  const [prevJobLeavingReason, setPrevJobLeavingReason] = useState([]);
  const [prevCompanyMobileNum, setPrevCompanyMobileNum] = useState([]);
  const [prevCompanySubjectToFMCR, setPrevCompanySubjectToFMCR] = useState([]);
  const [prevCompanyDOTRegulation, setPrevCompanyDOTRegulation] = useState([]);

  //util functions
  const jobPositionHandler = (event) => {
    setJobPosition(event.target.value);
  };

  const fileUploadHandler = (event) => {
    setCertificates((prevState) => [...prevState, event.target.files[0]]);
  };

  const imageUploading = () => {
    var imagesRef = ref(storage, "images/1234/medicalCertificate.jpg");
    uploadBytes(imagesRef, certificates[0])
      .then((snapshot) => {})
      .catch((err) => {
        console.error(err);
      });
    imagesRef = ref(storage, "images/1234/driversLicense.jpg");
    uploadBytes(imagesRef, certificates[1])
      .then((snapshot) => {})
      .catch((err) => {
        console.error(err);
      });
    for (var i = 0; i < certificates.length; i++) {
      imagesRef = ref(storage, `images/1234/roadtestCertificates${i}.jpg`);
      uploadBytes(imagesRef, certificates[2 + i])
        .then((snapshot) => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };

  //component
  const PrevEmployment = ({ index }) => {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            value={prevEmploymentFrom[index]}
            views={["year", "month"]}
            maxDate={new Date()}
            onChange={(newValue) => {
              var temp = [...prevEmploymentFrom];
              temp[index] = newValue;
              setPrevEmploymentFrom(temp);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="To"
            value={prevEmploymentTo[index]}
            minDate={prevEmploymentFrom[index]}
            views={["year", "month"]}
            onChange={(newValue) => {
              var temp = [...prevEmploymentTo];
              temp[index] = newValue;
              setPrevEmploymentTo(temp);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-required"
          label="Present or Last Employer Name"
          value={prevEmployerName[index]}
          onChange={(event) => {
            var temp = [...prevEmployerName];
            temp[index] = event.target.value;
            setPrevEmployerName(temp);
          }}
        />
        <TextField
          id="outlined-required"
          label="Position Held"
          value={prevJobPosition[index]}
          onChange={(event) => {
            var temp = [...prevJobPosition];
            temp[index] = event.target.value;
            setPrevJobPosition(temp);
          }}
        />
        <TextField
          id="outlined-required"
          label="ADDRESS"
          value={prevJobAddress[index]}
          onChange={(event) => {
            var temp = [...prevJobAddress];
            temp[index] = event.target.value;
            setPrevJobAddress(temp);
          }}
        />
        <TextField
          multiline
          rows={4}
          id="outlined-required"
          label="Reason for leaving"
          value={prevJobLeavingReason[index]}
          onChange={(event) => {
            var temp = [...prevJobLeavingReason];
            temp[index] = event.target.value;
            setPrevJobLeavingReason(temp);
          }}
        />
        <MuiPhoneNumber
          name="phone"
          label="Company phone"
          data-cy="user-phone"
          defaultCountry={"us"}
          value={prevCompanyMobileNum[index]}
          onChange={(event) => {
            var temp = [...prevCompanyMobileNum];
            temp[index] = event.target.value;
            setPrevCompanyMobileNum(temp);
          }}
        />
        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            Were you subject to the FMCSRs while employed here?
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(event) => {
              var temp = [...prevCompanySubjectToFMCR];
              temp[index] = event.target.value;
              setPrevCompanySubjectToFMCR(temp);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            Was your job designated as a safety-sensitive function in any DOT-
            regulated mode subject to the drug and alcohol testing requirements
            of 49 CFR Part 40?
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(event) => {
              var temp = [...prevCompanyDOTRegulation];
              temp[index] = event.target.value;
              setPrevCompanyDOTRegulation(temp);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </>
    );
  };
  const EmploymentHistory = () => {
    return (
      <>
        {rows.map((_, i) => {
          return <PrevEmployment index={i} key={i} />;
        })}
      </>
    );
  };

  //rendering
  return (
    <div className="App">
      <div className="body">
        <h1 className="body-title">Driver Application Form</h1>
        <h4 className="body-miniTitle">Applicant Information</h4>

        <TextField
          id="outlined-read-only-input"
          label="APPLICATION DATE"
          defaultValue={
            presentDate.getMonth() +
            1 +
            "/" +
            presentDate.getDay() +
            "/" +
            presentDate.getFullYear()
          }
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          id="outlined-select-currency"
          select
          required
          label="POSITION APPLYING FOR"
          value={jobPosition}
          onChange={jobPositionHandler}
          helperText="Please choose the job position you are applying for"
        >
          <MenuItem value="Contractor">Contractor</MenuItem>
          <MenuItem value="Driver">Driver</MenuItem>
          <MenuItem value="Contractor’s Driver">Contractor’s Driver </MenuItem>
        </TextField>
        <TextField
          inputRef={element => inputRef.current[0]=element}
        //  inputRef={inputRef}
          required
          id="outlined-required"
          label="NAME"
          //value={applicantName}
          onChange={(event) => {
           // setApplicantName(event.target.value);
            console.log(inputRef.current[0].value)
          }}
        />

        <MuiPhoneNumber
          required
          name="phone"
          label="PHONE NUMBER"
          data-cy="user-phone"
          defaultCountry={"us"}
          value={mobileNumber}
          onChange={(event) => {
            setMobileNumber(event);
          }}
        />

        <TextField
          required
          type="number"
          id="outlined-required"
          label="AGE"
          inputRef={element => inputRef.current[1]=element}
          //value={age}
          onChange={(event) => {
          //  setAge(event.target.value);
          console.log(inputRef.current[1].value)
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="BIRTH DATE"
            value={birthDate}
            maxDate={new Date()}
            onChange={(newValue) => {
              setBirthDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          id="outlined-required"
          label="SS#"
          value={ss}
          onChange={(event) => {
            setSS(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="PHYSICAL EXAM EXPIRATION DATE"
            value={physicalExamExpirationDate}
            maxDate={new Date()}
            onChange={(newValue) => {
              setPhysicalExamExpirationDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <p>CURRENT & PREVIOUS THREE YEARS ADDRESSES:</p>
        <TextField
          required
          id="outlined-required"
          label="ADDRESS"
          value={firstAddress}
          onChange={(event) => {
            setFirstAddress(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            value={firstAdressFrom}
            maxDate={new Date()}
            onChange={(newValue) => {
              setFirstAddressFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="To"
            value={firstAddressTo}
            minDate={firstAdressFrom}
            onChange={(newValue) => {
              setFirstAdressTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          id="outlined-required"
          label="ADDRESS"
          value={secondAddress}
          onChange={(event) => {
            setSecondAddress(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            value={secondAddressFrom}
            maxDate={new Date()}
            onChange={(newValue) => {
              setSecondAddressFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="To"
            value={secondAddressTo}
            minDate={secondAddressFrom}
            onChange={(newValue) => {
              setSecondAddressTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          id="outlined-required"
          label="ADDRESS"
          value={thirdAddress}
          onChange={(event) => {
            setThirdAddress(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            value={thirdAddressFrom}
            maxDate={new Date()}
            onChange={(newValue) => {
              setThirdAddressFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="To"
            value={thirdAddressTo}
            minDate={thirdAddressFrom}
            onChange={(newValue) => {
              setThirdAddressTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            HAVE YOU WORKED FOR THIS COMPANY BEFORE?
          </FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(e) => {
              setPreviousWorkInTheCompany(e.target.value);
            }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <p>If yes, give dates:</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            value={previousWorkFrom}
            maxDate={new Date()}
            onChange={(newValue) => {
              setPreviousWorkFrom(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="To"
            value={previousWorkTo}
            minDate={previousWorkFrom}
            onChange={(newValue) => {
              setPreviousWorkTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <p>Reason for leaving?</p>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth={true}
          value={reasonForLeaving}
          onChange={(e) => {
            setReasonForLeaving(e.target.value);
          }}
        />

        <h6>EDUCATION HISTORY: </h6>
        <p> Please circle the highest grade completed:</p>

        <FormControl component="fieldset" required>
          <FormLabel component="legend">Grade school:</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(e) => {
              setGradeSchoolStudied(e.target.value);
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
            <FormControlLabel value="6" control={<Radio />} label="6" />
            <FormControlLabel value="7" control={<Radio />} label="7" />
            <FormControlLabel value="8" control={<Radio />} label="8" />
            <FormControlLabel value="9" control={<Radio />} label="9" />
            <FormControlLabel value="10" control={<Radio />} label="10" />
            <FormControlLabel value="11" control={<Radio />} label="11" />
            <FormControlLabel value="12" control={<Radio />} label="12" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">College:</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(e) => {
              setCollegeStudied(e.target.value);
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Post Graduate:</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            onChange={(e) => {
              setPostGradStudied(e.target.value);
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        </FormControl>

        <h2>EMPLOYMENT HISTORY:</h2>
        <p>
          Give a COMPLETE RECORD of all employment for the past three (3) years,
          including any unemployment or self employment periods, and all
          commercial driving experience for the past ten (10) years
        </p>
        <EmploymentHistory />
        {/*  */}
        {/* <label htmlFor="file-upload" className="custom-file-upload">
            <FontAwesomeIcon icon={faUpload} color="white" />
            <p className="file-upload-button">Upload File</p>
          </label> */}
        {/* for medical certificate */}
        <input
          accept="image/*"
          id="file-upload"
          single="true"
          type="file"
          onChange={fileUploadHandler}
        />
        {/* for driver's license */}
        <input
          accept="image/*"
          id="file-upload"
          single="true"
          type="file"
          onChange={fileUploadHandler}
        />
        {/* for driver road test's certificate */}
        <input
          accept="image/*"
          id="file-upload"
          multiple={true}
          type="file"
          onChange={fileUploadHandler}
        />
        <button onClick={imageUploading}>upload to storage</button>
      </div>
    </div>
  );
}

export default App;
