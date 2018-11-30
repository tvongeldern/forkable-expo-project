import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import TextInput from './components/TextInput';
import { Button } from '@components';

import {} from '../validation';

function StorageForm(props) {
	const {
		handleSubmit,
		...rest
	} = props;
	return (
		<View>
		</View>
	);
}

StorageForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
	form: 'StorageForm',
})(StorageForm);

