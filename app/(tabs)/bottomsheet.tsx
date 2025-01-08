import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Pressable, Image, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { mapData } from '@/assets/constants/data';
import { useWebMap } from '@/assets/store/webMapData';

const BottomSheetComponent = () => {
    const sheetRef = useRef<BottomSheet>(null);
    const mapRef = useRef<MapView>(null);
    const snapPoints = ['45%', '95%'];
    const { webmap : {coordinates} } = useWebMap();


    const handleMarkerPress = () => {
        sheetRef.current?.snapToIndex(0);
    };

    useEffect(() => {
        if (mapRef.current && coordinates) {
            mapRef.current.animateToRegion(
                {
                    latitude: coordinates.lat,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                },
                1000 
            );
        }
    }, [coordinates]);

    const mapInfo = mapData[0];

    return (
        <GestureHandlerRootView style={styles.container}>
            <MapView
                ref={mapRef}
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
                {
                    coordinates && (
                        <Marker
                            coordinate={{
                                latitude: coordinates.lat,
                                longitude: coordinates.longitude,
                            }}
                            title={mapInfo.title}
                            onPress={() => handleMarkerPress()}
                        />
                    )
                }
            </MapView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetView>
                    <View className="p-4 bg-white rounded-lg">
                        <View className="flex flex-row justify-between items-center mb-4">
                            <Text className="text-2xl font-bold text-gray-800">{mapInfo.title}</Text>
                            <Pressable onPress={() => sheetRef.current?.close()}>
                                <Ionicons name="close" size={24} color="black" />
                            </Pressable>
                        </View>

                        <Text className="text-gray-600 mb-2">{mapInfo.address}</Text>

                        {mapInfo.drivingInfo && (
                            <View className="flex flex-row items-center mb-4">
                                <Ionicons name="car" size={20} color="black" />
                                <Text className="ml-2 text-lg text-gray-800">
                                    {mapInfo.drivingInfo.distance} ({mapInfo.drivingInfo.time} drive)
                                </Text>
                            </View>
                        )}

                        <View className="flex flex-row items-center mb-4">
                            <Ionicons name="star" size={20} color="#FFD700" />
                            <Text className="ml-2 text-lg text-gray-800 font-semibold">
                                {mapInfo.rating} ({mapInfo.reviewsCount} reviews)
                            </Text>
                        </View>

                        <Text className="text-gray-600 mb-4">{mapInfo.description}</Text>

                        <View className="flex flex-row flex-wrap mb-4">
                            {mapInfo.tags && mapInfo.tags.map((tag, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2"
                                >
                                    <Text className="text-gray-800 text-sm">{tag}</Text>
                                </View>
                            ))}
                        </View>

                        <FlatList
                            data={mapInfo.images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item }}
                                    style={styles.image}
                                    className="me-4 rounded-lg"
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            className="mb-4"
                        />

                        <View className="mb-4">
                            <Text className="text-lg text-gray-800 font-semibold">Operating Hours</Text>
                            <Text className="text-gray-600">Open: {mapInfo.openHours}</Text>
                            <Text className="text-gray-600">Close: {mapInfo.closeHours}</Text>
                        </View>

                        <View className="mt-4">
                            <Text className="text-lg text-gray-800 font-semibold">Contact</Text>
                            <Text className="text-gray-600">{mapInfo.contact}</Text>
                        </View>
                    </View>
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
    image: {
        width: 200,
        height: 150,
        marginVertical: 10,
    },
});

export default BottomSheetComponent;
