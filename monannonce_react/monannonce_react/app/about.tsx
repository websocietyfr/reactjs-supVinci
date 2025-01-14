import { View, Text } from 'react-native'
import Layout from '@/components/Layout'

const about = () => {
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <Text>Bienvenu sur la page About</Text>
            </View>
        </Layout>
    )
}

export default about;