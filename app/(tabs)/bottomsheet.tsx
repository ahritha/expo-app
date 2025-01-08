import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { mapData } from '@/assets/constants/data';


const BottomSheetComponent = () => {
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = ['45%', '95%']

    const handleMarkerPress = () => {
        sheetRef.current?.snapToIndex(1);
    };

    const mapInfo =  mapData[0];

    return (
        <GestureHandlerRootView style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 11.5564,
                    longitude: 104.9282,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                
            >
                {mapData.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        onPress={() => handleMarkerPress()}
                    />
                ))}

            </MapView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={-1}
            >   
                    <BottomSheetView> 
                            <Text>{mapInfo.title}</Text>
                            <Text>{mapInfo.description}</Text>
                            <Image source={{ uri: mapInfo.images[0] }} style={styles.image} />
                            <Text>Open Hours: {mapInfo.openHours}</Text>
                            <Text>Close Hours: {mapInfo.closeHours}</Text>
                            <Pressable style={styles.closeButton} onPress={() => sheetRef.current?.close()}>
                                <Text style={styles.closeButtonText}>Close</Text>
                                <Ionicons name={'close'} size={24} color="white" />
                            </Pressable>
                    </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    image: {
        width: 200,
        height: 150,
        marginVertical: 10,
    },
    closeButton: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        marginRight: 5,
    },
});

export default BottomSheetComponent;