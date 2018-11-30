import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Colors from '@constants/Colors';

function getStyleFromStatus(status) {
	switch (status) {
	case 0:
		return { backgroundColor: Colors.red };
	case 1:
		return { backgroundColor: Colors.yellow };
	case 2:
		return { backgroundColor: Colors.green };
	default:
		return {};
	}
}

export default function StatusButton(props) {
	const {
		status,
		...rest
	} = props;
	const style = getStyleFromStatus(status);
	return <Button {...{ style }} {...rest} />;
}

StatusButton.propTypes = {
	status: PropTypes.number.isRequired,
};
