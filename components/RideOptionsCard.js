import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "./Map";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "http://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: "http://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber Lux",
    multiplier: 1.75,
    image: "http://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("UberX");
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <View style={tw`h-full`}>
      <View style={tw`h-2/5`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[
            tw`absolute top-10 left-8 z-10 rounded-full bg-white w-14 h-14 shadow-lg`,
            styles.backButtonContainer,
          ]}
        >
          <Icon name="chevron-left" type="fontawesome" color="#000" size={35} />
        </TouchableOpacity>
        <Map />
      </View>
      <SafeAreaView style={tw`h-3/5 bg-white`}>
        <View style={tw`p-5`}>
          <Text style={styles.title}>
            Choose a ride - {travelTimeInformation?.distance.text}
          </Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(title);
              }}
              style={tw`flex-row items-center justify-between px-5 ${
                title === selected && "bg-gray-200"
              }`}
            >
              <View style={tw`flex-row items-center`}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                  source={{ uri: image }}
                />
                <View>
                  <Text style={tw`text-xl font-semibold`}>{title}</Text>
                  <Text style={tw`text-blue-400`}>
                    Time: {travelTimeInformation?.duration?.text}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "narrowSymbol",
                }).format(
                  (travelTimeInformation?.duration?.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <View
            style={tw`h-14 items-center flex-row pl-5 border-t-2 border-gray-100 justify-between pr-5`}
          >
            <View style={tw`flex-row items-center justify-center`}>
              <View style={tw`bg-black w-10 items-center`}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                  }}
                  source={require("../img/mc.png")}
                />
              </View>
              <Text style={tw`pl-5 text-lg`}>**** 8021</Text>
            </View>

            <Icon
              style={tw`self-end`}
              name="chevron-right"
              type="fontawesome"
              color="#848884"
              size={35}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            disabled={!selected}
            style={tw`h-16 bg-black py-3 m-3 ${
              !selected && "bg-gray-300"
            } justify-center`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              {!selected ? "Confirm car" : `Confirm ${selected}`}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
  },
  backButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
