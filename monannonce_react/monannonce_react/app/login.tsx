import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { fetchData } from "@/hooks/fetchData";
import FormLogin from "@/components/FormLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/context/UserContext";

const login = () => {
    const { user, setUser } = useContext(UserContext);

    const onPress = async ({username, password}: {username: string, password: string}) => {
        const body = {
            email: username,
            password
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(body.email) || body.email.length === 0) {
            return showMessage({
                message: 'Erreur',
                description: 'Votre email est invalide.',
                type: 'danger',
                icon: 'danger',
            });
        }
        if (body.password.length === 0) {
            return showMessage({
                message: 'Erreur',
                description: 'Veuillez renseigner un mot de passe.',
                type: 'danger',
                icon: 'danger',
            });
        }
        await fetchData('/login','POST', body)
            .then(async (result) => {
                if(result.errors) {
                    console.log('ERREUR DE CONNEXION');
                    showMessage({
                        message: 'Erreur, connexion échouée',
                        type: 'danger',
                        icon: 'danger',
                    });
                } else {
                    await AsyncStorage.setItem('token', result.token.token);
                    // await AsyncStorage.setItem('changeMode', 'Client');
                    const user = await fetchData('/user/me', 'GET');
                    setUser(user);
                    router.push({ pathname: '/'});
                }                
            })
            .catch((e: any) => {
                console.log('ERR loading', e)
                return showMessage({
                    message: 'Erreur lors du traitement de la connexion',
                    type: 'danger',
                    icon: 'danger',
                });
            })
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
            }}
        >
            <Image source={require('@/assets/images/monAnnonce-Logo.png')} style={{ width: 350, height: 100 }}></Image>
            <FormLogin onPress={onPress} />
            <View
                style={{ alignItems: "center" }}
            >
                <View
                    style={{ marginTop: 25, alignItems: "center" }}
                >
                    {/* <Link href={{ pathname: '/forgot' }}>
                        <Text>Mot de passe oublié ?</Text>
                    </Link> */}
                </View>
                <View
                    style={{ marginTop: 25, alignItems: "center" }}
                >
                    <Text>Pas encore de compte ?</Text>
                    {/* <Link href={{ pathname: '/register' }}>
                        <Text>S'inscrire</Text>
                    </Link> */}
                </View>
            </View>
            <FlashMessage position="bottom" />
        </View>
    );
}

export default login;