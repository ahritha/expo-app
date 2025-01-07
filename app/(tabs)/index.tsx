import { View, StyleSheet } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState , useRef } from 'react';
import IconButton from '../components/IconButton';
import CircleButton from '../components/CircleButton';
import EmojiList from '../components/EmojiList';
import EmojiPicker from '../components/EmojiPicker';
import { ImageSource } from 'expo-image';
import EmojiSticker from '../components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/placeholder.png');

export default function Index() {
  const [image, setImage] = useState<string>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowModal(false)
  }

  const onUseImage = () => {
    if (!image) return
    setShowModal(true)
  }
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (

    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
      <View style={styles.imageWrapper} ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={image} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
        {
          showModal ? <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View> : <View>
            <Button label="Choose a photo" onPress={pickImageAsync} theme="primary" />
            <Button label="Use this photo" onPress={onUseImage} />
          </View>
        }
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  flexItem: {
    flex: 1,
  },

  imageWrapper: {
    position: 'relative',
    width: 320,
    height: 440,
    borderRadius: 18,
    overflow: 'hidden',
  },
});