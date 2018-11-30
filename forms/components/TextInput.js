import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import Colors from '@constants/Colors';
import { errorText } from '@constants/Styles';

export default function Input(props) {
	const {
		label,
		input,
		meta: {
			active,
			submitFailed,
			error,
		},
		...rest
	} = props;
	const inputStateStyle = !active ? {} : styles.activeInput;
	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput {...input} style={[styles.input, inputStateStyle]} {...rest} />
			{submitFailed && error && <Text style={errorText}>{error}</Text>}
		</View>
	);
}

const FONT_SIZE = 20;
const INPUT_PADDING_VERTICAL = 4;
const INPUT_BORDER_WIDTH = 1;
const FOCUSED_INPUT_BORDER_WIDTH = 2;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 4,
	},
	activeInput: {
		borderColor: Colors.blue,
		borderBottomWidth: FOCUSED_INPUT_BORDER_WIDTH,
		paddingBottom: INPUT_PADDING_VERTICAL - FOCUSED_INPUT_BORDER_WIDTH + INPUT_BORDER_WIDTH,
	},
	input: {
		color: Colors.textColor,
		paddingVertical: INPUT_PADDING_VERTICAL,
		marginVertical: 8,
		fontSize: FONT_SIZE,
		borderColor: Colors.transparentGray,
		borderBottomWidth: INPUT_BORDER_WIDTH,
	},
	label: {
		fontWeight: '600',
		color: Colors.textColor,
		fontSize: FONT_SIZE - 4,
		marginVertical: 4,
	},
});