import { types } from "@babel/core";
import React from "react";
import { TouchableOpacity, Image, Text, View, Dimensions} from "react-native";
import { Category } from "../../models";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
type categoryItemProps={
    item:Category;
}
function index({item}:categoryItemProps) {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("CategoryDetails",{Category:item})} style={{width:width*0.25, height:width*0.24,
         flexDirection:'column', alignItems:'center', justifyContent:'space-between',marginTop:10}}>   
            <View>
                <Image style={{width:width*0.20, height:height*0.10, borderRadius:8}}source={{uri:item.src}}>
                </Image>
                <Text style={{fontSize:12,color:'#616161',fontWeight:'500'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default index;