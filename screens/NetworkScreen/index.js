import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
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

class NetworkScreen extends React.Component {
	static propTypes = {
		connectionTest: PropTypes.func.isRequired,
		connectionTestStatus: PropTypes.number.isRequired,
	}

	render() {
		const { connectionTest, connectionTestStatus } = this.props;
		return (
			<Screen>
				<StyledText>Press the button below to test your network connection.</StyledText>
				<StatusButton
					text={getNetworkStatusText(connectionTestStatus)}
					status={connectionTestStatus}
					onPress={connectionTest} />
			</Screen>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkScreen);
