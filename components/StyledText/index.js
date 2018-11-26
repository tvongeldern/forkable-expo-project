import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

export default function StyledText(props) {
	const {
		style,
		...rest
	} = props;

	return (
		<Text {...rest} style={[style, styles]} />
	);
}

StyledText.propTypes = {
	style: PropTypes.object,
};

StyledText.defaultProps = {
	style: {},
};
