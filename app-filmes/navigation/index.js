import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditMovieScreen from '../screens/AddEditMovieScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function Routes({ movies, addMovie, updateMovie, removeMovie }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2e0dd1' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} movies={movies} />}
        </Stack.Screen>
        <Stack.Screen name="AdicionarEditar">
          {(props) => (
            <AddEditMovieScreen
              {...props}
              addMovie={addMovie}
              updateMovie={updateMovie}
              movies={movies}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Detalhes">
          {(props) => (
            <DetailsScreen
              {...props}
              movies={movies}
              removeMovie={removeMovie}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}