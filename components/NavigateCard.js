import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_TOKEN } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  setDestination,
  setOrigin,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements/dist/input/Input";
import { selectOrigin } from "../slices/navSlice";
import Map from "../components/Map";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <>
      <View style={styles.profContainer}>
        <Image
          style={{
            width: 30,
            height: 30,
            resizeMode: "cover",
            borderRadius: 50 / 2,
          }}
          source={require("../img/prof1.jpg")}
        />
        <Text style={tw`pl-2`}>For John</Text>
      </View>
      <View style={tw`min-w-full pb-5 bg-white`}>
        <GooglePlacesAutocomplete
          placeholder={
            origin?.location != null ? origin.address : "Pickup Location"
          }
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            {
              if (destination) {
                navigation.navigate("RideOptionsCard");
              }
            }
          }}
          query={{
            key: API_TOKEN,
            language: "en",
          }}
          debounce={400}
        />
        <GooglePlacesAutocomplete
          placeholder={
            destination?.location != null ? destination.address : "Where to?"
          }
          styles={toInputBoxStyles}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
            {
              if (origin) {
                navigation.navigate("RideOptionsCard");
              }
            }
          }}
          query={{
            key: API_TOKEN,
            language: "en",
          }}
          debounce={400}
        />
      </View>
      <View style={tw`h-full`}>
        <Map />
      </View>
      <View style={styles.confirmLocation}>
        <TouchableOpacity
          onPress={() => {
            if (origin?.location != null && destination?.location != null) {
              navigation.navigate("RideOptionsCard");
            }
          }}
          style={tw`bg-black h-full items-center justify-center w-9/12`}
        >
          <View>
            <Text style={tw`text-white text-lg`}>Confirm Destinations</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 16,
    height: 40,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
const styles = StyleSheet.create({
  profContainer: {
    width: "100%",
    paddingTop: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "10%",
    backgroundColor: "#fff",
  },
  confirmLocation: {
    position: "absolute",
    zIndex: 1,
    bottom: 70,
    width: "100%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
});
