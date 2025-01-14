import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import Card from '@/components/Card';
// import { ScrollView } from "react-native-gesture-handler";
import Layout from '@/components/Layout'
import { Button, Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { fetchData } from "@/hooks/fetchData";

const search = () => {
    const { key } = useLocalSearchParams();
    // const [annonces, setAnnonces] = useState([]);
    const annonces = [
        {
            id: 1,
            title: 'Test1',
            description: 'Test1 description',
            price: 12.40
        },
        {
            id: 2,
            title: 'Test2',
            description: 'Test2 description',
            price: 21.09
        },
        {
            id: 3,
            title: 'Test3',
            description: 'Test3 description',
            price: 15.99
        },
        {
            id: 4,
            title: 'Test4',
            description: 'Test4 description',
            price: 17.90
        },
        {
            id: 5,
            title: 'Test5',
            description: 'Test5 description',
            price: 50.45
        },
        {
            id: 6,
            title: 'Test6',
            description: 'Test6 description',
            price: 250.0
        }
    ]

    // useEffect(() => {
    //     fetchData('/annonce/search', "GET", { key }).then((data) => setAnnonces(data));
    // }, [])

    return (
        <Layout>
            <Text>Lancez une recherche pour consulter les annonces :</Text>
            <Text>Results for {key} :</Text>
            {annonces.map(annonce => (
                <Card
                    title={annonce.title}
                    subtitle={annonce.price}
                    content={annonce.description}
                    id={annonce.id}
                />
            ))}
        </Layout>
    );
}

export default search;