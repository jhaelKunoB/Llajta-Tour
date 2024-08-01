import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ComBottomSheet = () => {
  const snapPoints = useMemo(() => ["10%", "25%", "50%", "70%"], []);
  const bottomSheetRef = useRef(null);

  const handlerClose = () => bottomSheetRef.current?.close();
  const handlerOpen = () => bottomSheetRef.current?.expand();

  return (   
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
      >
        <Text>Awesome 🎉</Text>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ComBottomSheet;
