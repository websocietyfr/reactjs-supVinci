import { useCurrentUser, UserContext } from "@/context/UserContext";
import { fetchData } from "@/hooks/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Appbar, Button } from "react-native-paper";

const layout = ({ style = {
        flex: 1,
        justifyContent: "start",
    }, children }: { style?: Object; children?: any }) => {
    
    const { user, setUser } = useContext(UserContext);
    
    useEffect( () => {
        if(!('id' in user)) {
            console.log('USER CONDITION SUCCEED');
            fetchData('/user/me', 'GET').then((user) => setUser(user));
        }
    }, [])

    async function logout() {
        await AsyncStorage.removeItem('token');
        setUser({});
        router.push({ pathname: '/login' });
    }

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
                    <Text>Bienvenue {user.firstname} {user.lastname} !</Text>
                    <Button onPress={() => logout()}>Déconnexion</Button>
                    <Text>PLOP</Text>
                    {children}
                </View>
            </ScrollView>
            <FlashMessage position="bottom" />
        </View>
    );
}

export default layout;