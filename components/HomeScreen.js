import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "./NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_TOKEN } from "@env";
import { useDispatch } from "react-redux";
import { Input } from "react-native-elements/dist/input/Input";
import { setDestination, setOrigin } from "../slices/navSlice";
import AroundYou from "./AroundYou";
import { Icon } from "react-native-elements";
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity style={tw`h-24 pl-8 pb-3 items-start bg-white justify-end`}>
        <View style={tw`bg-white`}>
          <Icon name="menu" size={40}/>
        </View>
      </TouchableOpacity>
      <NavOptions />
      <GooglePlacesAutocomplete
        placeholder="Where to?"
        styles={GoogleInputBox}
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        minLength={2}
        fetchDetails={true}
        textInputProps={{
          placeholderTextColor: "black",
          returnKeyType: "search",
        }}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
              address: details.formatted_address,
            })
          );
          dispatch(setOrigin(null));
          navigation.navigate("MapScreen");
        }}
        query={{
          key: API_TOKEN,
          language: "en",
        }}
        debounce={400}
      />
      <AroundYou />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  whereToInput: {
    backgroundColor: "#ebebeb",
    height: 60,
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
const GoogleInputBox = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 5,
    flex: 0,
    paddingBottom: 20,
  },
  textInput: {
    borderRadius: 0,
    fontSize: 16,
    fontWeight: "bold",
    height: 50,
    backgroundColor: "#E5E4E2",
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
