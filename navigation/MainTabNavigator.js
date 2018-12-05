import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '@components/TabBarIcon';
import NetworkScreen from '@screens/NetworkScreen';
import FormScreen from '@screens/FormScreen';

const NetworkStack = createStackNavigator({
	Network: NetworkScreen,
});

NetworkStack.navigationOptions = {
	tabBarLabel: 'Network',
	tabBarIcon: ({ focused }) => ( // eslint-disable-line react/prop-types
		<TabBarIcon
			focused={focused}
			name={`signal-cellular-${focused ? '3' : 'outline'}`}
		/>
	),
};

const StorageStack = createStackNavigator({
	Storage: FormScreen,
});

StorageStack.navigationOptions = {
	tabBarLabel: 'Storage',
	tabBarIcon: ({ focused }) => ( // eslint-disable-line react/prop-types
		<TabBarIcon
			focused={focused}
			name={`file-document${focused ? '' : '-outline'}`}
		/>
	),
};

export default createBottomTabNavigator({
	NetworkStack,
	StorageStack,
});
