/*
 * @Author: patty.hao patty.hao@lrctl.com
 * @Date: 2024-05-29 11:07:27
 * @LastEditors: patty.hao patty.hao@lrctl.com
 * @LastEditTime: 2024-05-29 18:48:00
 * @FilePath: \demo01\view\RFIDPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      //const ndefHandler = NfcManager.ndefHandler as NdefHandler; // Cast as NdefHandler
      //const ndefMessage = await ndefHandler.getNdefMessage(); // Use ndefHandler for Ndef operations
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      //console.warn('NDEF Message', ndefMessage);
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