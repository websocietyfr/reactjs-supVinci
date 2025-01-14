import { Button, TextInput } from "react-native-paper";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const formLogin = ({ email, onPress }: { email: string, onPress: Function}) => {
    return (
        <View>
            <TextInput label={"Email"} value={email} onChangeText={(text) => setEmail(text)} placeholder={"email@email.com"} style={{ marginTop: 25 }} />
            <TextInput label={"Mot de passe"} value={password} onChangeText={(text) => setPassword(text)} placeholder={"*****"} secureTextEntry={true}  style={{ marginTop: 25 }} />
            <Button mode="contained" onPress={onPress} style={{ marginTop: 25 }}>Se connecter</Button>
        </View>
    )
}

export default formLogin;