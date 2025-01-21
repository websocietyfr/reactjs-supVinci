import UserProvider from "@/context/UserContext";
import { Stack } from "expo-router";
import { PaperProvider, Text } from "react-native-paper";

export default function RootLayout() {

  return (
    <PaperProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </PaperProvider>
  );
}
