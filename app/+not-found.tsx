import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NotFound = () => {
  return (
    <View>
          <Text style={styles.container}>not found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});

export default NotFound