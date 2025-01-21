import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Searchbar, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import Layout from '@/components/Layout';

export default function Index() {
  const [search, setSearch] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  const searchAction = () => {
    if(search) {
      console.log('the search', search);
      setLoadingButton(true);
      router.push({ pathname: '/search', params: { key: search }});
      setLoadingButton(false);
    }
  };

  return (
    <Layout>
      <Text>Bienvenue sur Mon Annonce</Text>
      <Text>Lancez une recherche pour consulter les annonces :</Text>
      <Searchbar
        placeholder="Recherche"
        onChangeText={text => setSearch(text)}
        onKeyPress={(event) => {
          if(event.key === 'Enter') {
            searchAction();
          }
        }}
        value={search}
      />
      <Button loading={loadingButton} mode="contained" onPress={() => searchAction()}>
        Rechercher
      </Button>
    </Layout>
  );
}
