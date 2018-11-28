import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './connectors';
import {
	Screen,
	StyledText,
} from '@components';

class NetworkScreen extends React.Component {
	static propTypes = {

	}

	render() {
		const {  } = this.props;

		return (
			<Screen>
				<StyledText>Cool</StyledText>
			</Screen>
		);
	}
}
export default NetworkScreen;
// export default connect(mapStateToProps, mapDispatchToProps)(NetworkScreen);
