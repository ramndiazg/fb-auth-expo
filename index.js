import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import React, {useRef, useState} from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from './config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import 'firebase/compat/auth/phoneAuthProvider';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 20,
    },
    textInput:{
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    sendCode:{
        padding: 20,
        backgroundColor: 'yellow',
        borderRadius: 10,
    },
    sendVerification:{
        padding: 20,
        backgroundColor: 'yellow',
        borderRadius: 10,
    }
});

export const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId)
            .catch((error) => {
                console.error("Error sending verification code:", error);
            });
            setPhoneNumber();
    };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('')
        })
        .catch((error) => {
            alert(error.message);
        })
        Alert.alert('login succesfully');
    };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.otpText}>
        Login
      </Text>
      <TextInput
        placeholder='phone number with country code'
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'
        autoCompleteType='tel'
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
        <Text style={styles.buttonText}>
            Send Verification
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder='confirm code'
        onChangeText={setCode}
        keyboardType='number-pad'
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>
            Confirm Verification
        </Text>
      </TouchableOpacity>
    </View>
  )
}


