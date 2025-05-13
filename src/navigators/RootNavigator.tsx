import React, { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import HomeNavigator from "./HomeNavigator";
import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
//grid list menu unread align list server

const Tab = createBottomTabNavigator();
function Main() {
  const CustomTabBarButton = ({ children }: { children: ReactNode }) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: "white",
          borderWidth: 2,
          borderRadius: 32,
          justifyContent: "center",
          marginTop: -8,
          alignItems: "center",
          backgroundColor: "#5C3EBC",
          width: 55,
          height: 55,
        }}
      >
        <Entypo name="list" size={32} color="#FFD00C" />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="AnaSayfa"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#5C3EBC",
        tabBarInactiveTintColor: "#959595",
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="AnaSayfa"
        component={HomeNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

          // console.log("Aktif ekran:", routeName); // Debug için bakabilirsin

          if (routeName === 'ProductDetails' || routeName === 'CartScreen') {
            return {
              tabBarStyle: { display: 'none' },
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            };
          }

          return {
            tabBarStyle: {
              height: 80,
              backgroundColor: 'white',
            },
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          };
        }}
      />


      <Tab.Screen
        name="Search"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={HomeNavigator}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Personal"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}

      />
      <Tab.Screen
        name="Gift"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" size={24} color={color} />),
        }}
      />
    </Tab.Navigator>
  );
}
export default Main;
