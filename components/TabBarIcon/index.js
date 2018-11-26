import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import Colors from '@constants/Colors';
import styles from './styles';

export default function TabBarIcon(props) {
	const {
		focused,
		name,
	} = props;

	return (
		<Icon.Ionicons
			name={name}
			size={26}
			style={styles}
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		/>
	);
}

TabBarIcon.propTypes = {
	name: PropTypes.string.isRequired,
	focused: PropTypes.bool.isRequired,
};
