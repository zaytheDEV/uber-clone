import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";

const AroundYou = () => {
  return (
    <View style={tw`h-1/2 bg-white mt-3`}>
      <Text style={tw`text-xl pb-5 pt-5 pl-5`}>Around You</Text>
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    </View>
  );
};

export default AroundYou;

const styles = StyleSheet.create({});
