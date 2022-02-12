import React from "react";
import tw from "tailwind-react-native-classnames";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { Images } from "../assets/images";

const data = [
  {
    id: "123",
    title: "Ride",
    image: Images.icon1,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Grocery",
    image: Images.icon2,
    screen: "",
  },
  {
    id: "147",
    title: "Food",
    image: Images.icon3,
    screen: "",
  },
  {
    id: "258",
    title: "Package",
    image: Images.icon4,
    screen: "",
  },
  {
    id: "369",
    title: "Reserve",
    image: Images.icon5,
    screen: "",
  },
  {
    id: "321",
    title: "Hourly",
    image: Images.icon6,
    screen: "",
  },
  {
    id: "654",
    title: "Rent",
    image: Images.icon7,
    screen: "",
  },
  {
    id: "987",
    title: "Vaccine",
    image: Images.icon8,
    screen: "",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      style={optionContainer.container}
      horizontal={false}
      numColumns={4}
      contentContainerStyle={{ alignItems: "center" }}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <View style={tw`items-center m-1 mb-5`}>
            <View style={homeCardStyles.container}>
              <Image style={homeCardStyles.icon} source={item.image} />
            </View>
            <Text style={tw`mt-2 text-sm font-semibold`}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const homeCardStyles = StyleSheet.create({
  container: {
    width: 80,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
const optionContainer = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%'
  }
})