import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { API_TOKEN } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch();
  const [initialLocation, setInitialLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  useEffect(() => {
    mapRef.current.fitToElements(["origin, destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToElements(["origin, destination"], {
      edgePadding: { top: 50, right: 60, bottom: 50, left: 60 },
    });
  }, []);
  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${API_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, API_TOKEN]);
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: !origin ? initialLocation.latitude : origin?.location.lat,
        longitude: !origin ? initialLocation.longitude : origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={API_TOKEN}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier={"origin"}
        >
          <View>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
              source={require("../img/o-m.png")}
            />
          </View>
        </Marker>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier={"destination"}
        >
          <View>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
              source={require("../img/d-m.png")}
            />
          </View>
        </Marker>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
