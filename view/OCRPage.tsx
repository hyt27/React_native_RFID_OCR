//OCRPage.tsx
import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Text, Button, Image } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const OCRPage = () => {
  const [image, setImage] = useState(null);

  const handleChooseImage = () => {
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
          Alert.alert('You have cancelled taken an image',"");
      } else if (response.errorCode == "permission") {
          Alert.alert('Sorry, we need camera permissions to make this work!',"");
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
  launchImageLibrary(options, (response) => {
      if (response.didCancel) {
          Alert.alert('You have cancelled chosen an image',"");
      } else if (response.errorCode == "permission") {
          Alert.alert('Sorry, we need photo library permissions to make this work!',"");
      } else {
          setImage(response.assets[0].uri);
      }
  });
  };

  return (
    <View>
      <Text>OCR Page</Text>
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Capture Image" onPress={handleCaptureImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default OCRPage;