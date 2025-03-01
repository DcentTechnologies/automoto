import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const { data } = await axios.post("https://localhost:5000/api/auth/login", {email, password});
            await AsyncStorage.setItem("token", data.token);
            navigation.replace("Home");
            } catch (error) {
                Alert.alert("Error", "Invalid credentials");
    }
};

return (
    <View>
        <Text>Login</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
        <Button title="Login" onPress={handleLogin} />
    </View>
)
};

export default LoginScreen;