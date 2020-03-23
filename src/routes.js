import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CadastroUser from "./pages/CadastroUser";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoginWithChat() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Logar" component={Login} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Cadastrar") {
              iconName = "user-plus";
            } else if (route.name === "Logar") {
              iconName = "user-check";
            }

            return <FontAwesome5 name={iconName} size={20} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "#57479E",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Cadastrar" component={CadastroUser} />
        <Tab.Screen
          name="Logar"
          component={LoginWithChat}
          options={({ route }) => {
            const tabBarVisible =
              route.state?.routes[route.state.index].name === "Chat"
                ? false
                : true;
            return { tabBarVisible };
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
