import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import Card from '@/components/Card';
// import { ScrollView } from "react-native-gesture-handler";
import Layout from '@/components/Layout'
import { useEffect, useState } from "react";
import { fetchData } from "@/hooks/fetchData";

const search = () => {
    const { key } = useLocalSearchParams();

    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        fetchData('/search?key=' + key, "GET").then((data) => {
            console.log('DATA SEARCH', data);
            setAnnonces(data);
        });
    }, [])

    return (
        <Layout>
            <Text>Lancez une recherche pour consulter les annonces :</Text>
            <Text>Results for {key} :</Text>
            {annonces.map(annonce => (
                <Card
                    title={annonce.title}
                    price={annonce.price}
                    content={annonce.description}
                    id={annonce.id}
                />
            ))}
        </Layout>
    );
}

export default search;