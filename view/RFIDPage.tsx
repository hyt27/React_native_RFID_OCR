//RFIDPage.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, NdefHandler } from 'react-native-nfc-manager';

const RFIDPage = () => {
  useEffect(() => {
    NfcManager.start();

    return () => {
      NfcManager.cancelTechnologyRequest();
      NfcManager.unregisterTagEvent();
    };
  }, []);

  const readNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const ndefHandler = NfcManager.ndefHandler as NdefHandler; // Cast as NdefHandler
      const ndefMessage = await ndefHandler.getNdefMessage(); // Use ndefHandler for Ndef operations
      console.warn('NDEF Message', ndefMessage);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RFIDPage;