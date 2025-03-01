import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName="Login">
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="Home" component={HomeScreen} />
                </stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;