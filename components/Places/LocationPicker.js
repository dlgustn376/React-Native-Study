import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View,  } from "react-native";
import { 
    PermissionStatus, 
    getCurrentPositionAsync, 
    useForegroundPermissions 
} from 'expo-location'
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/color";
import { getMapPreciew } from "../../util/location";

function LocationPicker ({onPickLocation}) {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused(); 

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInfomation, requestPermission] = useForegroundPermissions();


    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLocation = { 
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(()=>{
        onPickLocation(pickedLocation);
    },[pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if(locationPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInfomation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permission!',
                'You need to grant location permission to use this app'
            );
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if(!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation) {
        locationPreview = (
            <Image 
                style={styles.image}
                source={{
                    uri:getMapPreciew(pickedLocation.lat, pickedLocation.lng),
                    }} 
            />
        );
    }

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton ico='map' onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );

};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    actions:{
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",

    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});