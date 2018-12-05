import {
	saveToStorage,
	readFromStorage,
} from '@state/reducers/demo';

export function mapStateToProps(state) {
	return {
		storage: state.demo.storage,
	};
}

export const mapDispatchToProps = {
	saveToStorage,
	readFromStorage,
};
