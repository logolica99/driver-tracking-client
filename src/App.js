import "./App.css";
import "./styles/BasePage.scss";
import "./firebaseConfig";
import { useState, useContext } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//component import
import AuthPage from "./components/AuthPage";
import ApplicantInformation from "./components/ApplicantInformation";
import EmploymentHistory from "./components/EmploymentHistory";

import DriverExperience from "./components/DriverExperience";
import JobReferences from "./components/JobReferences";

//contexts import
import { AuthContext } from "./context/AuthContext";
import { DriverExperienceContext } from "./context/DriverExperienceContext";
import { PrevEmploymentContext } from "./context/PrevEmploymentContext";
import { ApplicantInformationContext } from "./context/ApplicantInformationContext";

//firebase import

// import { getStorage, uploadBytes, ref } from "firebase/storage";
import { getDatabase, ref, set } from "firebase/database";

function App() {
  //context initializing

  const [AuthState, authDispatch] = useContext(AuthContext);
  const [DriverExperienceState] = useContext(DriverExperienceContext);
  const [PreviousEmploymentState] = useContext(PrevEmploymentContext);
  const [ApplicantInfoState] = useContext(ApplicantInformationContext);

  //// firebase storage image reference

  //states

  const [jobRefererName, setJobRefererName] = useState([""]);
  const [jobRefererAddress, setJobRefererAddress] = useState([""]);
  const [jobRefererNumber, setJobRefererNumber] = useState([""]);

  ///data uploading to firebase database
  const writeUserData = async (e) => {
    e.preventDefault();
    authDispatch({
      type: "UPDATE_LOADING",
      payload: {
        loading: true,
      },
    });
    console.log("clicked");
    const db = getDatabase();

    set(ref(db, "users/" + AuthState.phoneNumber), {
      applicantInformation: ApplicantInfoState,

      employmentHistory: PreviousEmploymentState,
      drivingExperience: DriverExperienceState,

      jobReferences: {
        jobRefererName: jobRefererName,

        jobRefererAddress: jobRefererAddress,

        jobRefererNumber: jobRefererNumber,
      },
    }).then(() => {
      authDispatch({
        type: "UPDATE_LOADING",
        payload: {
          loading: false,
        },
      });
      authDispatch({
        type: "REMOVE_USER",
      });
    });
  };

  //util functions

  //file uploading

  //rendering
  return (
    <div className="App">
      <div>
        <div className="App-title">
          <h1>Driver Application Form</h1>
        </div>
        <Dialog open={AuthState.loading}>
          <DialogContent>
            <CircularProgress size={90} />
          </DialogContent>
        </Dialog>
        {AuthState.doesExist ? (
          <AuthPage />
        ) : (
          <form onSubmit={writeUserData}>
            <div className="body">
              <ApplicantInformation />

              <EmploymentHistory />
              <DriverExperience />
              <JobReferences
                jobRefererName={jobRefererName}
                setJobRefererName={setJobRefererName}
                jobRefererAddress={jobRefererAddress}
                setJobRefererAddress={setJobRefererAddress}
                jobRefererNumber={jobRefererNumber}
                setJobRefererNumber={setJobRefererNumber}
              />
              <div className="submitButton">
                <Button
                  size="large"
                  // onClick={writeUserData}
                  variant="contained"
                  type="submit"
                  color="success"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
