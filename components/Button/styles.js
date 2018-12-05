import { StyleSheet } from 'react-native';
import Colors from '@constants/Colors';

export default StyleSheet.create({
	button: {
		backgroundColor: Colors.blue,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 48,
		alignSelf: 'flex-start',
		marginVertical: 8,
		borderRadius: 4,
	},
	text: {
		color: Colors.white,
	},
});
