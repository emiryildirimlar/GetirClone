import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { Product } from "../../models";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/cartActions";

const { height, width } = Dimensions.get('window')

type ProductItemType = {
    item: Product
    addItemToCart: (a: Product) => void
}
function ProductItem({ item, addItemToCart }: ProductItemType) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { product: item })}
            style={{
                width: width * 0.28,
                marginTop: 12,
                marginLeft: 12,
                height: height * 0.24,
                //backgroundColor:'red',
                marginBottom: 6
            }}
        >
            <Image style={{
                width: width * 0.28, height: width * 0.28, borderRadius: 12,
                borderWidth: 0.1, borderColor: 'gray'
            }}
                source={{ uri: item.image }} />
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 11.4, color: "#747990", textDecorationLine: 'line-through' }}>
                    <Text>{"\u20BA"}</Text>{item.fiyat}
                </Text>
                <Text style={{
                    color: "#5D3EBD",
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 4

                }}>
                    <Text>{"\u20BA"}</Text>{item.fiyatIndirimli}
                </Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 5 }}>
                {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#747990", marginTop: 4, fontWeight: '500' }}>
                {item.miktar}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    console.log("Adding item to cart:", item);
                    addItemToCart(item);
                }}
                style={{
                    alignItems: 'center', shadowRadius: 3.8, shadowOpacity: 0.05,
                    justifyContent: 'center', width: 30, height: 30,
                    borderWidth: 0.3, borderColor: 'lightgray', backgroundColor: 'white',
                    position: 'absolute', right: -6, top: -4, borderRadius: 6,
                }}>
                <Entypo name="plus" size={22} color="#5d3ebd" />
            </TouchableOpacity>

        </TouchableOpacity>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product: Product) =>
            dispatch(actions.addToCart(product))
        
    }
}


export default connect(null, mapDispatchToProps)(ProductItem);