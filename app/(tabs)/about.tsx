import React, { useRef } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import WebView from 'react-native-webview';
import { useWebMap } from '@/assets/store/webMapData';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
    const router = useRouter();
    const webviewRef = useRef<WebView>(null);
    const { webmap, setWebMap } = useWebMap();

    const handleGetMessage = (event: any) => {
        const mapData = JSON.parse(event.nativeEvent.data);
        setWebMap(mapData.info);
    };

    const sendMessageToWeb = () => {
        const message = { type: 'GET_MAP_DATA' };
        if (webviewRef.current) {
            webviewRef.current.injectJavaScript(`
                window.postMessage(${JSON.stringify(message)}, '*');
            `);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webviewRef}
                source={{ uri: 'http://192.168.12.24:5173' }}
                style={styles.webview}
                onMessage={handleGetMessage}
            />
            <Button title="Send Data to Web" onPress={sendMessageToWeb} />
{/*             <Text>{JSON.stringify(webmap, null, 2)}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        width: '100%',
        height: '100%',
    },
    webview: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});