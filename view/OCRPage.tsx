//OCRPage.tsx
import React, { useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

const OCRPage = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleChooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: "photo"
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('You have cancelled chosen an image', "");
      } else if (response.errorCode === "permission") {
        Alert.alert('Sorry, we need photo library permissions to make this work!', "");
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleCaptureImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: "photo"
      },
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('You have cancelled taken an image', "");
      } else if (response.errorCode === "permission") {
        Alert.alert('Sorry, we need camera permissions to make this work!', "");
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleOCR = async () => {
    if (image) {
      const resultFromUri = await MlkitOcr.detectFromUri(image);
      console.log(resultFromUri);
      //const resultFromFile = await MlkitOcr.detectFromFile(image);
      //console.log(resultFromFile);
      const extractedText = resultFromUri.map((textElement) => textElement.text).join('\n');
      setExtractedText(extractedText);
      console.log(extractedText);
    } else {
      Alert.alert('No image selected', "");
    }
  };



  return (
    <View>
      <Text>OCR Page</Text>
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Capture Image" onPress={handleCaptureImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Run OCR" onPress={handleOCR} />
      <Text>{extractedText}</Text>
    </View>
  );
};

export default OCRPage;