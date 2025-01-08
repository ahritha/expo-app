import { View, Text, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ButtonProps = {
    label: string
    theme?: string
    onPress?: () => void
    noIcon?: boolean
}
const Button = ({ label, theme, onPress, noIcon = false }: ButtonProps) => {

    if (theme === 'primary') {
        return (
            <View style={{ backgroundColor: 'white', borderWidth: 4, borderRadius: 10, borderColor: "yellow", padding: 10, justifyContent: 'center', alignItems: 'center', height: 60, marginVertical: 30 }} >
                <Pressable style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }} onPress={onPress}>
                    {
                        !noIcon && <FontAwesome style={{ marginRight: 10 }} name="picture-o" size={24} color="black" />
                    } 
                        
                    <Text >{label}</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <Pressable onPress={onPress}>
                <Text style={{ color: 'white' }} >{label}</Text>
            </Pressable>
        </View>
    )
}

export default Button