import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react';
import { fetchData } from '@/hooks/fetchData';

const annonce = () => {
  const { id } = useLocalSearchParams();
  const [annonce, setAnnonce] = useState({
    title: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchData('/offer/'+id, "GET").then((data) => setAnnonce(data));
  }, [id])

  return (
    <Layout>
      <Text>Détails de l'annonce {id} </Text>
      <Text>Titre : {annonce.title}</Text>
      <Text>Description : {annonce.description}</Text>
      <Text>Price : {annonce.price}</Text>
    </Layout>
  );
}

export default annonce;
