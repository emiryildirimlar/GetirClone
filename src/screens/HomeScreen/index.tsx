import React from "react";
import { ScrollView } from "react-native";
import HeaderMain from "../../components/HeaderMain";
import BannerCarousel from "../../components/BannerCarousel";
import CategoryItem from "../../components/MainCategories";
import MainCategories from "../../components/MainCategories";

function index() {
    return(
        <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor:'#F5F5F5'}}>
            <HeaderMain></HeaderMain>
            <BannerCarousel/>
            <MainCategories/>

        </ScrollView>
  );
}

export default index;