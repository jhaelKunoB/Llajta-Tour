import React, {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator, StatusBar } from "react-native";
import "expo-dev-client";
import Navigation from "./src/presentation/navigator/navigation";

import Blurl from "./src/presentation/components/BlurLogin";
import UserAuth from './database/userAuth'



export default function App() {

  const { user, loading } = UserAuth();




  if (loading) {
    return (
      <>
        <Blurl />
        <ActivityIndicator
          style={{ backgroundColor: "transparent", flex: 1 }}
          size="large"
        />
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
  splashContainer: {
    flex: 1,
  },
});
