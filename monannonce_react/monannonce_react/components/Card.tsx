import { useRouter } from 'expo-router';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

const card = ({ id=0, title='', price=0, content=''}) => {
    const router = useRouter();
    return (
        <Card
            style={{
                marginTop: 20
            }}
        >
            <Card.Title title={title} subtitle={price + ' €'} left={LeftContent} />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <Button onPress={() => router.push({ pathname: '/annonce/[id]', params: { id }})}>Voir l'annonce</Button>
            </Card.Actions>
        </Card>
    );
}

export default card;