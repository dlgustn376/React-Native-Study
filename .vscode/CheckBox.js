import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CheckBox from "@react-native-community/checkbox";

export default function CheckBoxDemo() {
  const [data, setData] = useState([
    { title: "Default" },
    { title: "Colored", checked: true, color: "#08f" },
    { title: "Disabled", checked: true, disabled: true },
  ]);

  function toggle(index) {
    const item = data[index];
    item.checked = !item.checked;
    setData([...data]);
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <CheckBox
        value={item.checked}
        onValueChange={() => toggle(index)}
        tintColors={{ true: item.color, false: "#000" }}
        disabled={item.disabled}
      />
      <Text style={styles.label}>{item.title}</Text>
    </View>
  );

  const keyExtractor = (item, index) => item.title + index;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
