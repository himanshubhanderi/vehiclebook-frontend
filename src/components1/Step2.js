import React from 'react';
import { FormControl, RadioGroup, Radio, FormControlLabel, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  radioLabel: {
    marginBottom: theme.spacing(1),
  },
}));

const Step2 = ({ formData, setFormData, vehicleWheelOptions }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      numOfWheels: e.target.value,
    }));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Number of Wheels
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Number of Wheels"
          name="numOfWheels"
          value={formData.numOfWheels}
          onChange={handleChange}
        >
          {vehicleWheelOptions.map((option) => (
            <FormControlLabel
              key={option.label}
              value={option.value.toString()} // Convert value to string if necessary
              control={<Radio color="primary" />}
              label={`${option.label} Wheels`}
              className={classes.radioLabel}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Step2;
