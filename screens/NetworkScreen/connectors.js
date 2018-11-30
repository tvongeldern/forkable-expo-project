import { connectionTest } from '@state/reducers/demo';

export function mapStateToProps({ demo }) {
	return {
		connectionTestStatus: demo.connectionTestStatus,
	};
}

export const mapDispatchToProps = {
	connectionTest,
};
