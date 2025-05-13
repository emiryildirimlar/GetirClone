import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import productsGetir from "../../../assets/productsGetir";
import CartItem from "../../components/CartItem";
import { ScrollView } from "react-native-gesture-handler";
import ProductItem from "../../components/ProductItem";
import { connect } from "react-redux";
import { Product } from "../../models";

const { width, height } = Dimensions.get('window')

function index({ cartItems }: { cartItems: { product: Product, quantity: number }[] }) {

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const getProductsPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
          const fiyat = item.product.fiyat ?? 0;
          total += fiyat * item.quantity;
        });
        setTotalPrice(total);
      };
      
    useEffect(() => {
        getProductsPrice();
        
    }, [cartItems]);
    
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: height * 0.12 }}
                data={cartItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <CartItem product={item.product} quantity={item.quantity} />
                }
                ListFooterComponent={
                    <View>
                        <Text style={{ padding: 15, fontWeight: 'bold', color: '#5D3EBD' }}>
                            Önerilen Ürünler
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={true}
                            style={{ backgroundColor: 'white', paddingBottom: 100 }}>
                            {productsGetir.map((item, index) => (
                                <ProductItem key={index} item={item} />
                            ))}
                        </ScrollView>
                    </View>
                }
            />

            <View style={{
                height: height * 0.12, flexDirection: 'row', alignItems: 'center',
                paddingHorizontal: '4%', position: 'absolute', bottom: 0, width: '100%',
                backgroundColor: '#f8f8f8'
            }}>
                <TouchableOpacity style={{
                    height: height * 0.06,
                    flex: 3, backgroundColor: '#5D3EBD', justifyContent: 'center', alignItems: 'center',
                    marginTop: -10,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Devam</Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
                    marginTop: -10,
                    borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                }}>
                    <Text style={{ fontSize: 16, color: '#5D3EBD', fontWeight: 'bold' }}>
                        <Text >{"\u20BA"}</Text>
                        {totalPrice.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View >
    )
}
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}


export default connect(mapStateToProps, null)(index);