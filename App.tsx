import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header, HeaderButtons } from './src/components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './src/screens/settings';
import GameDetailsScreen from './src/components/Game/GameDetails';
import styles from './src/components/constants/Styles';
import HomeScreen from './src/screens/homescreen';
import AddScreen from './src/screens/addscreen';
import EditScreen from './src/screens/editscreen';
import SearchScreen from './src/screens/searchscreen';
import IgdbAddScreen from './src/screens/igdbaddscreen';
import { colors } from './src/components/constants/Constants';
import FavoriteScreen from './src/screens/favoritescreen';
import { DataProvider } from './src/components/constants/DataContext';
import { Game } from './src/types/types';
import IgdbDetailsScreen from './src/components/Igdb/IgdbDetails';

export type ParamList = {
  Home: { update: boolean };
  Details: { gameId: string };
  Settings: undefined;
  Favorites: undefined;
  Add: undefined;
  Edit: { gameId: string };
  Search: undefined;
  Igdb: undefined;
  IgdbDetails: {gameObject: Game};
};

const Stack = createNativeStackNavigator<ParamList>();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: styles.header.backgroundColor,
          },
          headerTintColor: colors.titleColor,
          headerRight: (props) => <HeaderButtons navigation={navigation} />
        })}>
          <Stack.Screen name="Home" component={HomeScreen} options={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: styles.header.backgroundColor,
            },
            headerTitle: (props) => <Header />,
          })} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Details" component={GameDetailsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Favorites" component={FavoriteScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
          <Stack.Screen name="Igdb" component={IgdbAddScreen} />
          <Stack.Screen name="IgdbDetails" component={IgdbDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
