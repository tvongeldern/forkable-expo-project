import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';

import TextInput from './components/TextInput';
import { Button } from '@components';

import { required } from './validation';
import { formatPhoneNumber } from './formatters';
import { parsePhoneNumber } from './parsers';

const FORM_NAME = 'DemoForm';
const fullScreen = { width: '100%' };

function DemoForm(props) {
	const { handleSubmit } = props;
	return (
		<View style={fullScreen}>
			<Field
				label="Your Name"
				name="yourName"
				component={TextInput}
				validate={required} />
			<Field
				label="Phone Number"
				name="phoneNumber"
				component={TextInput}
				parse={parsePhoneNumber}
				format={formatPhoneNumber} />
			<Button onPress={handleSubmit} text="Submit" />
		</View>
	);
}

DemoForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
	form: FORM_NAME,
	onSubmitSuccess: (result, dispatch) => {
		dispatch(reset(FORM_NAME));
	},
})(DemoForm);
