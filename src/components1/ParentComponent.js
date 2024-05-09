import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  makeStyles,
} from "@material-ui/core";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { NotificationManager } from "react-notifications";

const steps = [
  "What is your name",
  "Number of wheels",
  "Type of vehicle",
  "Specific Model",
  "Date range picker",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    padding: theme.spacing(2),
  },
}));

const ParentComponent = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numOfWheels: "",
    vehicleType: "",
    vehicleModel: "",
    dateRange: {},
  });

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (
          formData.firstName.trim() !== "" &&
          formData.lastName.trim() !== ""
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          fetchVehicleWheelOptions();
        }
        break;
      case 1:
        if (formData.numOfWheels !== "") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          fetchVehicleTypeOptions(formData.numOfWheels);
        }
      case 2:
        if (formData.vehicleType !== "") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          fetchVehicleModelOptions(formData.vehicleType);
        }
        break;
      case 3:
        if (formData.vehicleModel !== "") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        break;
      case 4:
        if (formData.dateRange !== "") {
          registerVehicle();
          break;
        }

      default:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [vehicleWheelOptions, setVehicleWheelOptions] = useState([]);
  const [vehicleModelOptions, setVehicleModelOptions] = useState([]);

  const fetchVehicleWheelOptions = async () => {
    try {
      const response = await fetch(`http://localhost:8087/api/wheels`);
      console.log(response, "response");
      const data = await response.json();
      setVehicleWheelOptions(data.WheelsList);
    } catch (error) {
      console.error("Error fetching vehicle type options:", error);
    }
  };

  const fetchVehicleTypeOptions = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8087/api/vehicleType/${id}`
      );
      console.log(response, "response");
      const data = await response.json();
      setVehicleTypeOptions(data.vehicleTypeList);
    } catch (error) {
      console.error("Error fetching vehicle type options:", error);
    }
  };

  const fetchVehicleModelOptions = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8087/api/vehicleModel/${id}`
      );
      console.log(response, "response");
      const data = await response.json();
      setVehicleModelOptions(data.vehicleModelList);
    } catch (error) {
      console.error("Error fetching vehicle type options:", error);
    }
  };

  const registerVehicle = async () => {
    try {
      const response = await fetch("http://localhost:8087/api/vehicle/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Assuming you need to send an id in the request body
      });
      console.log(response, "response");
      const data = await response.json();
      console.log(data, "data");
      if (data.status == 201) {
        NotificationManager.success(data.message, "", 2000);
        setFormData({
          ...formData,
          firstName: "",
          lastName: "",
          numOfWheels: "",
          vehicleType: "",
          vehicleModel: "",
          dateRange: {},
        })
        setActiveStep(0);
      } else {
        NotificationManager.error(data.message, "", 2000);
      }
      // setVehicleModelOptions(data.vehicleModelList);
    } catch (error) {
      console.error("Error fetching vehicle type options:", error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <Step2
            formData={formData}
            setFormData={setFormData}
            vehicleWheelOptions={vehicleWheelOptions}
          />
        );
      case 2:
        return (
          <Step3
            formData={formData}
            setFormData={setFormData}
            vehicleTypeOptions={vehicleTypeOptions}
          />
        );
      case 3:
        return (
          <Step4
            formData={formData}
            setFormData={setFormData}
            vehicleModelOptions={vehicleModelOptions}
          />
        );
      case 4:
        return <Step5 formData={formData} setFormData={setFormData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
