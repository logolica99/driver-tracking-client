import React, { useContext, useEffect, useState } from "react";

import { TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { AuthContext } from "../context/AuthContext";
import { VehicleIntventoryContext } from "../context/VehicleInventoryContext";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function VehicleIntventory() {
  const storage = getStorage();
  const [state, dispatch] = useContext(VehicleIntventoryContext);
  const [authState, authDispatch] = useContext(AuthContext);
  const [Maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVIN] = useState("");
  const [plate, setPlate] = useState("");
  const [registeredState, setRegisteredState] = useState("");
  const [vehicleNotes, setVehicleNotes] = useState("");
  const [maintenanceDue, setMaintenanceDue] = useState("");
  const [maintenanceDueReceipt, setMainTenanceDueReceipt] = useState("");
  const [maintenanceDueReceiptUrl, setMainTenanceDueReceiptUrl] = useState("");

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
    setMainTenanceDueReceipt(event.target.files[0]);
  };

  //uploading image
  useEffect(() => {
    if (maintenanceDueReceipt) {
      authDispatch({
        type: "UPDATE_LOADING",
        payload: {
          loading: true,
        },
      });

      // licenceFiles.forEach((elem, index) => {
      var imageRef = ref(
        storage,
        `${authState.phoneNumber}/maintenanceReceipts.jpg`
      );
      uploadBytes(imageRef, maintenanceDueReceipt)
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
            ref(storage, `${authState.phoneNumber}/maintenanceReceipts.jpg`)
          ).then((url) => {
            setMainTenanceDueReceiptUrl(url);
          });
        });
      // });
    }
  }, [maintenanceDueReceipt]);

  //updating context
  useEffect(() => {
    changeHandler("Maker", Maker);
  }, [Maker]);
  useEffect(() => {
    changeHandler("model", model);
  }, [model]);
  useEffect(() => {
    changeHandler("carColor", color);
  }, [color]);
  useEffect(() => {
    changeHandler("vin", vin);
  }, [vin]);
  useEffect(() => {
    changeHandler("plate", plate);
  }, [plate]);
  useEffect(() => {
    changeHandler("registeredState", registeredState);
  }, [registeredState]);
  useEffect(() => {
    changeHandler("vehicleNotes", vehicleNotes);
  }, [vehicleNotes]);
  useEffect(() => {
    changeHandler("maintenanceDue", maintenanceDue);
  }, [maintenanceDue]);
  useEffect(() => {
    changeHandler("maintenanceDueReceiptUrl", maintenanceDueReceiptUrl);
  }, [maintenanceDueReceiptUrl]);


  return (
    <div>
      <h2 className="applicantInfo-title">Vehicle Inventory</h2>
      <div className="drivingExperience-item">
        <TextField
          required
          label="Maker"
          onBlur={(e) => {
            setMaker(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          required
          label="Model"
          onBlur={(e) => {
            setModel(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          required
          label="Color"
          onBlur={(e) => {
            setColor(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          required
          label="VIN#"
          onBlur={(e) => {
            setVIN(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          required
          label="Plate#"
          onBlur={(e) => {
            setPlate(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          required
          label="Registered State"
          onBlur={(e) => {
            setRegisteredState(e.target.value);
          }}
        />
      </div>
      <div className="drivingExperience-item">
        <TextField
          fullWidth
          required
          label="Vehicle Notes"
          onBlur={(e) => {
            setVehicleNotes(e.target.value);
          }}
        />
      </div>
      <div className="applicantInfo-item">
        <LocalizationProvider dateAdapter={AdapterDateFns} required>
          <DesktopDatePicker
            required
            label="MAINTENANCE DUE DATE"
            value={maintenanceDue}
            minDate={new Date()}
            onChange={(newValue) => {
              setMaintenanceDue(newValue.getTime());
            }}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="applicantInfo-item">
        <h4>Upload Maintenance Receipts</h4>
        <input
          required
          accept="image/*"
          id="file-upload"
          single="true"
          type="file"
          onChange={(e) => {
            fileUploadHandler(e);
          }}
        />
      </div>
    </div>
  );
}
