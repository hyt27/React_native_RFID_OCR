//OCRPage.tsx
/*
import React from 'react';
import { View, Text } from 'react-native';

const OCRPage = () => {
  return (
    <View>
      <Text>Welcome_OCR</Text>
    </View>
  );
};

export default OCRPage;*/
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

const OCRPage = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const imageSource = require('../assets/IDcard.png'); // Updated image source path

  useEffect(() => {
    performOCR();
  }, []);

  const performOCR = async () => {
    try {
      const tessOptions = {};

      const recognized = await TesseractOcr.recognize(imageSource, LANG_ENGLISH, tessOptions);
      setRecognizedText(recognized);
    } catch (error) {
      console.warn('OCR Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{recognizedText || 'OCR TEXT'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OCRPage;