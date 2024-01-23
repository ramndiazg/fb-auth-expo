
import { View, StyleSheet } from 'react-native';
import {Otp} from './index';

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <Otp/>
    </View>
  );
}
