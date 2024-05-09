import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Step, StepLabel, Stepper } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import OrgInformation from './steps/OrgInformation';
import BasicInfo from './steps/BasicInfo';

const steps = [BasicInfo, OrgInformation];

export default props => {
	const [activeStep, setActiveStep] = useState(0);

	const isLastStep = () => {
		return activeStep === steps.length - 1;
	};

	const handlePrev = () => {
		setActiveStep(Math.max(activeStep - 1, 0));
	};

	const handleNext = () => [
		setActiveStep(Math.min(activeStep + 1, steps.length - 1))
	];

	const onSubmit = (values, formikBag) => {
		const { setSubmitting } = formikBag;

		if (!isLastStep()) {
			setSubmitting(false);
			handleNext();
			return;
		}

		console.log(values);

		setTimeout(() => {
			setSubmitting(false);
		}, 1000);
	};

	const initialValues = steps.reduce(
		(values, { initialValues }) => ({
			...values,
			...initialValues
		}),
		{}
	);
	const ActiveStep = steps[activeStep];
	const validationSchema = ActiveStep.validationSchema;

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, touched, values }) => (
				<>
					<Form>
						<Stepper alternativeLabel activeStep={activeStep}>
							{steps.map((step, index) => (
								<Step key={index}>
									<StepLabel>{steps[index].label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Button
							disabled={activeStep === 0 || isSubmitting}
							onClick={handlePrev}
						>
							Previous
						</Button>
						<Button disabled={isSubmitting} type="submit">
							{isLastStep() ? 'Submit' : 'Next'}
						</Button>
						<SwipeableViews index={activeStep}>
							{steps.map((step, index) => {
								const Component = steps[index];
								return <Component key={index} values={values}/>;
							})}
						</SwipeableViews>
					</Form>
					<pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(touched, null, 2)}</pre>
				</>
			)}
		</Formik>
	);
};
