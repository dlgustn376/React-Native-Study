import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/color";

function Button ({onPress, children}) {
    return(
        <Pressable style={({pressed})=>[styles.button, pressed && styles.pressd]} onPress={onPress}>
            <Text style={styles.text} >{children}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowOpacity:0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressd:{
        opacity: 0.7
    },
    text:{
        textAlign: "center",
        fontSize: 16,
        color: Colors.primary50
    }
});