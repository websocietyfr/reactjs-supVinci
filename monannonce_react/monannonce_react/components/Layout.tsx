import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Appbar } from "react-native-paper";

const layout = ({ style = {
        flex: 1,
        justifyContent: "start",
    }, children }: { style?: Object; children?: any }) => {
    return (
        <View
            style={style}
        >
            <Appbar.Header
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF'
                }}
            >
                <Link href='/'>
                    <Image 
                        source={require('@/assets/images/monAnnonce-Logo.png')}
                        style={{ aspectRatio: 1, height: 40 }}
                        resizeMode="contain"
                    />
                </Link>
            </Appbar.Header>
            <ScrollView
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        padding: 20
                    }}
                >
                    {children}
                </View>
            </ScrollView>
            <FlashMessage position="top" />
        </View>
    );
}

export default layout;