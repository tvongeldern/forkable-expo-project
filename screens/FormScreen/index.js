import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './connectors';
import {
	Screen,
	StyledText,
} from '@components';
import { DemoForm } from '@forms';

class FormScreen extends React.Component {
	static propTypes = {
		readFromStorage: PropTypes.func.isRequired,
		saveToStorage: PropTypes.func.isRequired,
		storage: PropTypes.object.isRequired,
	}

	componentDidMount() {
		const { readFromStorage } = this.props;
		readFromStorage('yourName');
	}

	formSubmitHandler = (formData) => {
		const { saveToStorage } = this.props;
		saveToStorage('yourName', formData.yourName);
	}

	render() {
		const { storage: { yourName } } = this.props;
		return (
			<Screen>
				{yourName && <StyledText>{`Your name is saved as ${yourName}`}</StyledText>}
				<DemoForm onSubmit={this.formSubmitHandler} />
			</Screen>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);
