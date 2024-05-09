import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const Step1 = ({ formData, setFormData }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className={classes.root}>
      <h2>First, What's your name?</h2>
      <TextField
        variant="outlined"
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        variant="outlined"
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className={classes.textField}
      />
    </div>
  );
};

export default Step1;
