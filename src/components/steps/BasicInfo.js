import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, Container, Box } from '@material-ui/core'; // Importing Container and Box from Material-UI
import * as Yup from 'yup';

const BasicInfo = (props) => {
	console.log(props,'props')
  return (
    <Container maxWidth="sm"> {/* Setting max width for centering */}
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh"> {/* Centering content */}
        <Typography variant="h3" component="h1" align="center" gutterBottom> {/* Aligning typography to center */}
          First, what's your name?
        </Typography>
        <Field name="firstName" label="First Name" component={TextField} />
        <Field name="lastName" label="Last Name" component={TextField} />
      </Box>
    </Container>
  );
};

BasicInfo.label = 'Contact Information';
BasicInfo.initialValues = {
  firstName: '',
  lastName: '',
};
BasicInfo.validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
});

export default BasicInfo;
