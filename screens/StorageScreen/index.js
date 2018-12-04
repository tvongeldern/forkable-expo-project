import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './connectors';
import {
	Screen,
	StyledText,
} from '@components';
import { StorageForm } from '@forms';

class StorageScreen extends React.Component {
	static propTypes = {
		saveToStorage: PropTypes.func.isRequired,
	}

	render() {
		const {  } = this.props;

		return (
			<Screen>
				<StorageForm onSubmit={console.log} />
			</Screen>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StorageScreen);
