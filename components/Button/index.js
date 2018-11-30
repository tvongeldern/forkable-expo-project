import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import StyledText from '../StyledText';
import styles from './styles';

export default function Button(props) {
	const {
		style,
		text,
		textStyle,
		...rest
	} = props;

	return (
		<TouchableOpacity {...rest} style={[styles.button, style]}>
			<StyledText style={{ ...styles.text, ...textStyle }}>
				{text}
			</StyledText>
		</TouchableOpacity>
	);
}

Button.propTypes = {
	style: PropTypes.object,
	text: PropTypes.string,
	textStyle: PropTypes.object,
};

Button.defaultProps = {
	text: 'Submit',
	style: {},
	textStyle: {},
};
