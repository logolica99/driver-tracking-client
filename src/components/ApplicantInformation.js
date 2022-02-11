import { useState, useContext, useEffect } from "react";

import Button from "@mui/material/Button";

import { TextField, MenuItem } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import MuiPhoneNumber from "material-ui-phone-number";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

//importing contexts
import { AuthContext } from "../context/AuthContext";
import { ApplicantInformationContext } from "../context/ApplicantInformationContext";

//firebase imports
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function ApllicantInformation() {
  const storage = getStorage();

  const [state, dispatch] = useContext(ApplicantInformationContext);
  const [authState, authDispatch] = useContext(AuthContext);

  const [submissionDate, setSubmissionDate] = useState(new Date().getTime());
  const [jobPosition, setJobPosition] = useState("");
  const [applicantName, setApplicantName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  useEffect(() => {
    setMobileNumber(authState.phoneNumber);
  });
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState(new Date().getTime());
  const [ss, setSS] = useState("");

  const [physicalExamCertificate, setPhysicalExamCertificate] = useState();
  const [physicalExamCertificateURL, setPhysicalExamCertificateURL] =
    useState("");
  const [physicalExamExpirationDate, setPhysicalExamExpirationDate] = useState(
    new Date().getTime()
  );

  const [livingAddressAmount, setLivingAddressAmount] = useState([0]);
  const [livingAddresses, setLivingAddresses] = useState([]);
  const [livingAddressesFrom, setLivingAddressesFrom] = useState([]);
  const [livingAddressesTo, setLivingAddressesTo] = useState([]);

  const [previousWorkInTheCompany, setPreviousWorkInTheCompany] =
    useState("No");
  const [previousWorkFrom, setPreviousWorkFrom] = useState(
    new Date().getTime()
  );
  const [previousWorkTo, setPreviousWorkTo] = useState(new Date().getTime());
  const [reasonForLeaving, setReasonForLeaving] = useState("");

  const [gradeSchoolStudied, setGradeSchoolStudied] = useState("");
  const [collegeStudied, setCollegeStudied] = useState("");
  const [postGradStudied, setPostGradStudied] = useState("");

  //util functions

  const changeHandler = (fieldName, data) => {
    dispatch({
      type: "ADD_OBJECT_DATA",
      payload: {
        dataField: fieldName,
        data: data,
      },
    });
  };

  const fileUploadHandler = (event) => {
    setPhysicalExamCertificate(event.target.files[0]);
  };

  //uploading image
  useEffect(() => {
    if (physicalExamCertificate) {
      authDispatch({
        type: "UPDATE_LOADING",
        payload: {
          loading: true,
        },
      });
      var imageRef = ref(
        storage,
        `${authState.phoneNumber}/physicalExamCertificate.jpg`
      );
      uploadBytes(imageRef, physicalExamCertificate).then((res) => {
        console.log("filed uploaded successfully");
        authDispatch({
          type: "UPDATE_LOADING",
          payload: {
            loading: false,
          },
        });
      });
      getDownloadURL(
        ref(storage, `${authState.phoneNumber}/physicalExamCertificate.jpg`)
      ).then((url) => {
        setPhysicalExamCertificateURL(url);
      });
    }
  }, [physicalExamCertificate]);

  //updating context

  useEffect(() => {
    changeHandler("submissionDate", submissionDate);
  }, [submissionDate]);

  useEffect(() => {
    changeHandler("jobPosition", jobPosition);
  }, [jobPosition]);
  useEffect(() => {
    changeHandler("applicantName", applicantName);
  }, [applicantName]);
  useEffect(() => {
    changeHandler("mobileNumber", mobileNumber);
  }, [mobileNumber]);
  useEffect(() => {
    changeHandler("age", age);
  }, [age]);
  useEffect(() => {
    changeHandler("birthDate", birthDate);
  }, [birthDate]);
  useEffect(() => {
    changeHandler("ss", ss);
  }, [ss]);
  useEffect(() => {
    changeHandler("physicalExamCertificateURL", physicalExamCertificateURL);
  }, [physicalExamCertificateURL]);
  useEffect(() => {
    changeHandler("physicalExamExpirationDate", physicalExamExpirationDate);
  }, [physicalExamExpirationDate]);
  useEffect(() => {
    changeHandler("livingAddresses", livingAddresses);
  }, [livingAddresses]);
  useEffect(() => {
    changeHandler("livingAddressesFrom", livingAddressesFrom);
  }, [livingAddressesFrom]);
  useEffect(() => {
    changeHandler("livingAddressesTo", livingAddressesTo);
  }, [livingAddressesTo]);

  useEffect(() => {
    changeHandler("previousWorkInTheCompany", previousWorkInTheCompany);
  }, [previousWorkInTheCompany]);
  useEffect(() => {
    changeHandler("previousWorkFrom", previousWorkFrom);
  }, [previousWorkFrom]);
  useEffect(() => {
    changeHandler("previousWorkTo", previousWorkTo);
  }, [previousWorkTo]);
  useEffect(() => {
    changeHandler("reasonForLeaving", reasonForLeaving);
  }, [reasonForLeaving]);
  useEffect(() => {
    changeHandler("gradeSchoolStudied", gradeSchoolStudied);
  }, [gradeSchoolStudied]);
  useEffect(() => {
    changeHandler("collegeStudied", collegeStudied);
  }, [collegeStudied]);
  useEffect(() => {
    changeHandler("postGradStudied", postGradStudied);
  }, [postGradStudied]);

  return (
    <div className="applicantInfo">
      <div className="applicantInfo-title">
        <h2>Applicant Information</h2>
      </div>
      <div className="applicantInfo-item">
        <TextField
          id="outlined-read-only-input"
          label="APPLICATION DATE"
          defaultValue={
            new Date().getMonth() +
            1 +
            "/" +
            new Date().getDate() +
            "/" +
            new Date().getFullYear()
          }
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <TextField
          id="outlined-select-currency"
          select
          required
          label="POSITION APPLYING FOR"
          value={jobPosition}
          onChange={(event) => {
            setJobPosition(event.target.value);
          }}
          helperText="Please choose the job position you are applying for"
        >
          <MenuItem value="Contractor">Contractor</MenuItem>
          <MenuItem value="Driver">Driver</MenuItem>
          <MenuItem value="Contractor’s Driver">Contractor’s Driver </MenuItem>
        </TextField>
      </div>
      <div className="applicantInfo-item">
        <TextField
          // inputRef={element => inputRef.current[0]=element}
          //  inputRef={inputRef}

          id="outlined-required"
          label="NAME"
          required
          onChange={(event) => {
            setApplicantName(event.target.value);
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <TextField
          id="outlined-read-only-input"
          label="PHONE NUMBER"
          defaultValue={authState.phoneNumber}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <TextField
          required
          type="number"
          label="AGE"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <LocalizationProvider dateAdapter={AdapterDateFns} required>
          <DesktopDatePicker
            required
            label="BIRTH DATE"
            value={birthDate}
            maxDate={new Date()}
            onChange={(newValue) => {
              setBirthDate(newValue.getTime());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="applicantInfo-item">
        <TextField
          required
          id="outlined-required"
          label="SS#"
          onChange={(event) => {
            setSS(event.target.value);
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <p>Upload your Physical Exam Certificate:</p>
        <input
          accept="image/*"
          id="file-upload"
          single="true"
          type="file"
          onChange={fileUploadHandler}
        />
      </div>
      <div className="applicantInfo-item"></div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="PHYSICAL EXAM EXPIRATION DATE"
          value={physicalExamExpirationDate}
          maxDate={new Date()}
          onChange={(newValue) => {
            setPhysicalExamExpirationDate(newValue.getTime());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div className="applicantInfo-item">
        <p>CURRENT & PREVIOUS 3 YEARS ADDRESSES:</p>

        {livingAddressAmount.map((_, index) => (
          <div key={index} className="applicantInfo-item-vertical">
            <TextField
              required
              id="outlined-required"
              label="ADDRESS"
              onChange={(event) => {
                var temp = [...livingAddresses];
                temp[index] = event.target.value;
                setLivingAddresses(temp);
              }}
            />
            <div className="applicantInfo-item-horizontal">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                className="applicantInfo-item-horizontal"
              >
                <DesktopDatePicker
                  label="From"
                  value={livingAddressesFrom[index]}
                  maxDate={new Date()}
                  onChange={(newValue) => {
                    var temp = [...livingAddressesFrom];
                    temp[index] = newValue.getTime();
                    setLivingAddressesFrom(temp);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="applicantInfo-item-horizontal">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="To"
                  value={livingAddressesTo[index]}
                  minDate={livingAddressesFrom[index]}
                  maxDate={new Date()}
                  onChange={(newValue) => {
                    var temp = [...livingAddressesTo];
                    temp[index] = newValue.getTime();
                    setLivingAddressesTo(temp);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        ))}
      </div>
      <div className="applicantInfo-item">
        <Button
          variant="contained"
          onClick={() => {
            setLivingAddressAmount((prevData) => [...prevData, 0]);
          }}
        >
          Add New Address
        </Button>
      </div>
      <div className="applicantInfo-item">
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
        {previousWorkInTheCompany === "Yes" ? (
          <div>
            <p>If yes, give dates:</p>
            <div className="applicantInfo-item-vertical">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="From"
                  value={previousWorkFrom}
                  maxDate={new Date()}
                  onChange={(newValue) => {
                    setPreviousWorkFrom(newValue.getTime());
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <div className="applicantInfo-item-horizontal">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="To"
                    value={previousWorkTo}
                    minDate={previousWorkFrom}
                    onChange={(newValue) => {
                      setPreviousWorkTo(newValue.getTime());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <p>Reason for leaving?</p>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth={true}
              onBlur={(e) => {
                setReasonForLeaving(e.target.value);
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="applicantInfo-title">
        <h2>EDUCATION HISTORY </h2>
      </div>

      <div className="applicantInfo-item">
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
      </div>
      <div className="applicantInfo-item">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            College(leave empty if none):
          </FormLabel>
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
      </div>
      <div className="applicantInfo-item">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Post Graduate (leave empty if none):
          </FormLabel>
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
      </div>
    </div>
  );
}
