import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { Grid, Typography } from "@material-ui/core";
import * as Yup from "yup";

const OrgInformation = (props) => {
  console.log(props, "props");
  return (
    <>
      <Typography variant="h3" component="h1">
        Org Information
      </Typography>
      <Grid container spacing={1} component="section">
        <Grid item xs={12} sm={6}>
          <Field
            name="businessName"
            label="Business Name"
            component={TextField}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="streetAddress"
            label="Street Address"
            component={TextField}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

OrgInformation.label = "Org Information";
OrgInformation.validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Please enter your business name"),
  streetAddress: Yup.string().required("Please enter your street address"),
});

export default OrgInformation;
