import { useState } from "react";
import { Alert, Image, StyleSheet, View, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"

import { Colors } from "../../constants/color";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {

    const [pickerImage, setPickerImage] = useState();

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    
    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            
            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permission!',
                'You need to grant camera permission to use this app'
            );
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission  = await verifyPermissions();

        if(!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9],
            quality: 0.5,
            
        });
        setPickerImage(image.uri);
        onTakeImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if(pickerImage){
        imagePreview = <Image style={styles.image} source={{uri: pickerImage}} />
    }

    return(
        <View>
            <View style={styles.imagePicker}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePicker:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    image: {
        width: '100%',
        height: '100%'
    }
});