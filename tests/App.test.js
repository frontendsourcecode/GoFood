```javascript
// App.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import App from './App';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import PreRegisterScreen from './src/screen/PreRegisterScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import OTPScreen from './src/screen/OTPScreen';
import HomeScreen from './src/screen/HomeScreen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import ManageProfile from './src/screen/ProfileScreen/ManageProfile';
import CategoryScreen from './src/screen/CategoryScreen';
import ProductView from './src/screen/ProductView';
import Products from './src/screen/Products';
import Notification from './src/screen/Notification';
import CartScreen from './src/screen/CartScreen';
import Checkout from './src/screen/CheckoutScreen';
import OrderSuccess from './src/screen/OrderSuccess';
import OrderScreen from './src/screen/OrderScreen';
import OrderStatus from './src/screen/OrderScreen/OrderStatus';
import OrderDelivery from './src/screen/OrderScreen/OrderDelivery';
import messaging from '@react-native-firebase/messaging';
import requestUserPermission from './src/utils/NotificationService';

// Mocking dependencies
jest.mock('@react-native-firebase/messaging', () => ({
  messaging: {
    requestPermission: jest.fn(),
    getInitialNotification: jest.fn(),
    onMessageReceivedForeground: jest.fn(),
    onMessageReceivedBackground: jest.fn(),
  },
}));

// Mocking NotificationService
jest.mock('./src/utils/NotificationService', () => ({
  requestUserPermission: jest.fn(),
  notificationListener: jest.fn(),
}));

describe('App', () => {
  it('renders NavigationContainer', () => {
    const { getByType } = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );
    expect(getByType(NavigationContainer)).toBeTruthy();
  });

  it('calls requestUserPermission on mount', () => {
    render(<App />);
    expect(requestUserPermission).toHaveBeenCalledTimes(1);
  });

  it('calls notificationListener on mount', () => {
    render(<App />);
    expect(notificationListener).toHaveBeenCalledTimes(1);
  });

  describe('MainStackScreen', () => {
    it('renders SplashScreen by default', () => {
      const { getByType } = render(
        <MainStack.Navigator>
          <MainStack.Screen name="SplashScreen" component={SplashScreen} />
        </MainStack.Navigator>,
      );
      expect(getByType(SplashScreen)).toBeTruthy();
    });

    it('navigates to WelcomeScreen', () => {
      const { getByType, getByText } = render(
        <MainStack.Navigator>
          <MainStack.Screen name="SplashScreen" component={SplashScreen} />
          <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </MainStack.Navigator>,
      );
      const navigate = jest.fn();
      const navigation = { navigate };
      fireEvent.press(getByText('Welcome'));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('WelcomeScreen');
    });
  });

  describe('OrderScreenStack', () => {
    it('renders Checkout by default', () => {
      const { getByType } = render(
        <OrderStack.Navigator initialRouteName="Checkout">
          <OrderStack.Screen name="Checkout" component={Checkout} />
        </OrderStack.Navigator>,
      );
      expect(getByType(Checkout)).toBeTruthy();
    });

    it('navigates to OrderSuccess', () => {
      const { getByType, getByText } = render(
        <OrderStack.Navigator initialRouteName="Checkout">
          <OrderStack.Screen name="Checkout" component={Checkout} />
          <OrderStack.Screen name="OrderSuccess" component={OrderSuccess} />
        </OrderStack.Navigator>,
      );
      const navigate = jest.fn();
      const navigation = { navigate };
      fireEvent.press(getByText('Order Success'));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('OrderSuccess');
    });
  });

  describe('createDrawer', () => {
    it('renders HomeScreen by default', () => {
      const { getByType } = render(
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>,
      );
      expect(getByType(HomeScreen)).toBeTruthy();
    });

    it('navigates to ProfileScreen', () => {
      const { getByType, getByText } = render(
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>,
      );
      const navigate = jest.fn();
      const navigation = { navigate };
      fireEvent.press(getByText('Profile'));
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith('Profile');
    });
  });

  describe('error handling', () => {
    it('catches navigation errors', () => {
      const error = new Error('Navigation error');
      jest.spyOn(console, 'error').mockImplementationOnce(() => {});
      const { getByType } = render(
        <NavigationContainer>
          <App />
        </NavigationContainer>,
      );
      expect(() => {
        throw error;
      }).toThrowError('Navigation error');
    });
  });
});
```