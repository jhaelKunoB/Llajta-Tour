import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import "expo-dev-client";
import Navigation from "./src/presentation/navigator/navigation";

import Blurl from "./src/presentation/components/BlurLogin";
import UserAuth from "./database/userAuth";
import IconLoanding from './src/presentation/components/IconLoanding'

export default function App() {
  const { user, loading } = UserAuth();
  if (loading) {
    return (
      < >
        <Blurl />
        <IconLoanding/>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation user={user} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
});
