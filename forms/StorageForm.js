import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import TextInput from './components/TextInput';
import { Button } from '@components';

import { required } from './validation';
import { formatPhoneNumber } from './formatters';
import { parsePhoneNumber } from './parsers';

function StorageForm(props) {
	const { handleSubmit } = props;
	return (
		<View style={{ width: '100%' }}>
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

StorageForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
	form: 'StorageForm',
})(StorageForm);

