import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Robot,
	Screen,
	StatusButton,
	StyledText,
} from '@components';
import { mapStateToProps, mapDispatchToProps } from './connectors';

function getNetworkStatusText(networkStatus) {
	switch (networkStatus) {
	case 0:
		return 'Connection Failed';
	case 1:
		return 'Testing Connection...';
	case 2:
		return 'Connection Active!';
	default:
		return 'Test Connection';
	}
}

function NetworkScreen(props) {
	const { connectionTest, connectionTestStatus } = props;
	return (
		<Screen>
			<Robot />
			<StyledText>Press the button below to test your network connection.</StyledText>
			<StatusButton
				text={getNetworkStatusText(connectionTestStatus)}
				status={connectionTestStatus}
				onPress={connectionTest} />
		</Screen>
	);
}

NetworkScreen.propTypes = {
	connectionTest: PropTypes.func.isRequired,
	connectionTestStatus: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkScreen);
