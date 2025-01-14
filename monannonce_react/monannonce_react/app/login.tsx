import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import UserProvider, { UserContext } from "@/context/UserContext";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { fetchData } from "@/hooks/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);

    const onPress = async () => {
        const body = {
            email,
            password
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email) || email.length === 0) {
            return showMessage({
                message: 'Erreur',
                description: 'Votre email est invalide.',
                type: 'danger',
                icon: 'danger',
            });
        }
        if (password.length === 0) {

            return showMessage({
                message: 'Erreur',
                description: 'Veuillez renseigner un mot de passe.',
                type: 'danger',
                icon: 'danger',
            });
        }
        await fetchData('/login','POST', body)
            .then(async (token) => {
                await AsyncStorage.setItem('token', token.token);
                // await AsyncStorage.setItem('changeMode', 'Client');
                const user = await fetchData('/user/me', 'GET');
                // setUser(user);
                router.push({ pathname: '/'});
            })
            .catch((e: any) => {
                console.error(e);
            })
    };


    return (
        <UserProvider>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff"
                }}
            >
                <Image source={require('@/assets/images/monAnnonce-Logo.png')} style={{ width: 350, height: 100 }}></Image>
                <TextInput label={"Email"} value={email} onChangeText={(text) => setEmail(text)} placeholder={"email@email.com"} style={{ marginTop: 25 }} />
                <TextInput label={"Mot de passe"} value={password} onChangeText={(text) => setPassword(text)} placeholder={"*****"} secureTextEntry={true}  style={{ marginTop: 25 }} />
                <Button mode="contained" onPress={onPress} style={{ marginTop: 25 }}>Se connecter</Button>
                <View
                    style={{ alignItems: "center" }}
                >
                    <View
                        style={{ marginTop: 25, alignItems: "center" }}
                    >
                        <Link href={{ pathname: '/forgot' }}>
                            <Text>Mot de passe oublié ?</Text>
                        </Link>
                    </View>
                    <View
                        style={{ marginTop: 25, alignItems: "center" }}
                    >
                        <Text>Pas encore de compte ?</Text>
                        <Link href={{ pathname: '/register' }}>
                            <Text>S'inscrire</Text>
                        </Link>
                    </View>
                </View>
            </View>
            <FlashMessage position="top" />
        </UserProvider>
    );
}

export default login;