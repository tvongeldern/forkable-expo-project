import React from 'react';
import { Image } from 'react-native';
import robotImage from '@assets/images/robot.png';
import styles from './styles';

export default function Robot() {
	return <Image source={robotImage} style={styles.robot} />;
}
