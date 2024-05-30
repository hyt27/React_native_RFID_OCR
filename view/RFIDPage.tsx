//RFIDPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const RFIDPage = () => {
  const [tagId, setTagId] = useState('');
  const [techTypes, setTechTypes] = useState([]);

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
      const tag = await NfcManager.getTag();
      if (tag) {
        const id = tag.id ?? '';
        const techTypes = tag.techTypes ?? [] as unknown[]; //  unknown[]
        setTagId(id);
        setTechTypes(techTypes as never[]); //  never[]
        console.warn('Tag found', tag);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };
  

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef} style={styles.button}>
        <Text style={styles.buttonText}>Scan a Tag</Text>
      </TouchableOpacity>
      <View style={styles.tagInfo}>
        <Text style={styles.tagIdText}>id: {tagId}</Text>
        <Text style={styles.techTypesText}>techTypes: {techTypes.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagInfo: {
    alignItems: 'center',
  },
  tagIdText: {
    fontSize: 18,
    marginBottom: 10,
  },
  techTypesText: {
    fontSize: 14,
  },
});

export default RFIDPage;