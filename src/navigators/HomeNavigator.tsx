import React, { useEffect, useState } from "react";
import { createStackNavigator, HeaderStyleInterpolators } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import CategoryFilterScreen from "../screens/CategoryFilterScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, Foundation } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import useNavigation from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import route from "../navigators/RootNavigator";
import { connect } from "react-redux";
import { Product } from "../models";
import * as actions from "../redux/actions/cartActions";

const Stack = createStackNavigator()

const { width, height } = Dimensions.get('window')

function MyStack({ navigation, route, cartItems, clearCart }:
  { cartItems: { product: Product, quantity: number }[], clearCart: () => void }) {
  const tabhiddenRoutes = ['ProductDetails', 'CartScreen']
  const [totalPrice, setTotalPrice] = useState<number>(0)

  /*React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if(tabhiddenRoutes.includes(routeName)){
      navigation.setOptions({tabBarStyle:{display:'none'}})
    }
    else{
      console.log("Aç",routeName);
      navigation.setOptions({tabBarStyle:{display:'flex'}})
    }
  }, [navigation,route]
  )*/


  const getProductPrice = () => {
    var total = 0;
    cartItems.forEach(cartItems => {
      const price = (total += cartItems.product.fiyat);
      setTotalPrice(price)
    })
  }

  useEffect(() => {
    getProductPrice()
  }, [cartItems, navigation, route])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#5C3EBC',
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require("../../assets/getirlogo.png")}
              style={{ width: 70, height: 30 }}
            />
          )
        }} />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryFilterScreen}
        options={{
          headerTintColor: 'white',
          //headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#5C3EBC',
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Ürünler
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AnaSayfa", {
              screen: "CartScreen",
            })} style={{
              width: width * 0.22, height: 33,
              backgroundColor: "white",
              marginRight: width * 0.03,
              borderRadius: 9,
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Image style={{ width: 23, height: 23, marginLeft: 6 }}
                source={require("../../assets/cart.png")}></Image>
              <View style={{ height: 33, width: 4, backgroundColor: 'white' }}></View>
              <View style={{
                flex: 1, height: 33, backgroundColor: '#F3EFFE', borderBottomRightRadius: 9,
                borderTopRightRadius: 9, justifyContent: 'center', alignItems: 'center'
              }}>

                <Text style={{ color: '#5D3EDB', fontWeight: 'bold', fontSize: 12 }}>
                  <Text>{"\u20BA"}</Text>
                  {totalPrice.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )


        }} />
      <Stack.Screen
        options={{
          headerBackTitle: "",
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate("AnaSayfa");
                }
              }}
              style={{ paddingLeft: 12 }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>
              Ürün Detayı
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }}>
              <Foundation
                style={{ marginRight: 8 }}
                name="heart"
                size={26}
                color="#32177a"
              />
            </TouchableOpacity>
          ),

        }}
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' }}>
              Sepetim
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate("Home");
                }
              }}
              style={{ paddingLeft: 12 }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => clearCart()} style={{ paddingRight: 10 }}>
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          ),

        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart())
  }
}

function HomeNavigator({ navigation, route, cartItems, clearCart }:
  { clearCart: () => void }) {
  return <MyStack navigation={navigation} route={route} cartItems={cartItems}
    clearCart={clearCart}
  />;

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigator);