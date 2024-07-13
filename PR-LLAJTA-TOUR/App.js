import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import Navigation from './src/presentation/navigator/navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation/>
      <StatusBar style='light' backgroundColor='black' />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
