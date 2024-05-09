import React from "react";
import { DateRangePicker } from "materialui-daterange-picker";
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

const Step5 = ({ formData, setFormData }) => {
  const classes = useStyles();
  
  const handleChange = (range) => {
    setFormData((prevData) => ({
      ...prevData,
      dateRange: range,
    }));
  };

  return (
    <div>
      <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Chose Dates
      </Typography>
      <FormControl component="fieldset">
      <DateRangePicker open={true} onChange={handleChange} />
      </FormControl>
    </div>

    </div>
  );
};

export default Step5;
