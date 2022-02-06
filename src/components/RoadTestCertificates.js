import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

//firebase imports
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function RoadTestCertificates({
  roadTestCertificateUrls,
  setRoadTestCertificateUrls,
}) {
  const [authState, authDispatch] = useContext(AuthContext);
  const storage = getStorage();
  const [roadTestCertificates, setRoadTestCertificates] = useState([]);
  const [numberOfFiles, setNumberOfFiles] = useState([0]);
  const [uploadedFileIndex, setUploadedFileIndex] = useState("");

  const fileUploadHandler = (event, index) => {
    var temp = [...roadTestCertificates];
    temp[index] = event.target.files[0];
    setRoadTestCertificates(temp);
    setUploadedFileIndex(index);
  };

  //uploading image
  useEffect(() => {
    if (roadTestCertificates.length > 0) {
      authDispatch({
        type: "UPDATE_LOADING",
        payload: {
          loading: true,
        },
      });

      var imageRef = ref(
        storage,
        `${authState.phoneNumber}/RoadTestCertificate${uploadedFileIndex}.jpg`
      );
      uploadBytes(imageRef, roadTestCertificates[uploadedFileIndex])
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
              `${authState.phoneNumber}/RoadTestCertificate${uploadedFileIndex}.jpg`
            )
          ).then((url) => {
            var temp = [...roadTestCertificateUrls];

            temp[uploadedFileIndex] = url;
            console.log(temp);
            setRoadTestCertificateUrls(temp);
          });
        });
    }
  }, [uploadedFileIndex, roadTestCertificates]);

  return (
    <div>
      <p>Please upload your road test certificates:</p>
      {numberOfFiles.map((value, index) => (
        <div className="drivingExperience-item" key={index}>
          <input
            key={index}
            accept="image/*"
            id="file-upload"
            single="true"
            type="file"
            onChange={(e) => {
              fileUploadHandler(e, index);
            }}
          />
        </div>
      ))}
      <div className="drivingExperience-item">
        <Button
          variant="contained"
          onClick={() => {
            setNumberOfFiles((prevData) => [...prevData, 0]);
          }}
        >
          ADD MORE FILES
        </Button>
      </div>
    </div>
  );
}
