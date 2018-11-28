import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '@components/TabBarIcon';
import NetworkScreen from '@screens/NetworkScreen';
import StorageScreen from '@screens/StorageScreen';

const NetworkStack = createStackNavigator({
  Network: NetworkScreen,
});

NetworkStack.navigationOptions = {
  tabBarLabel: 'Network',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const StorageStack = createStackNavigator({
  Storage: StorageScreen,
});

StorageStack.navigationOptions = {
  tabBarLabel: 'Storage',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  NetworkStack,
  StorageStack,
});
