import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BoardGame from "./src/components/index";
import FinishScreen from "./src/components/indexFinish";
import HomeScreen from "./src/components/indexHome";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sugoku" component={BoardGame} />
        <Stack.Screen name="Finish" component={FinishScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;