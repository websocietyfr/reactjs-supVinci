import { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";

const formLogin = ({ onPress }: { onPress: Function}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <TextInput label={"Email"} value={username} onChangeText={(text) => setUsername(text)} placeholder={"email@email.com"} style={{ marginTop: 25 }} />
            <TextInput label={"Mot de passe"} value={password} onChangeText={(text) => setPassword(text)} placeholder={"*****"} secureTextEntry={true}  style={{ marginTop: 25 }} />
            <Button mode="contained" onPress={() => onPress({username, password})} style={{ marginTop: 25 }}>Se connecter</Button>
        </View>
    )
}

export default formLogin;