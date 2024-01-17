import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamList } from '../../App';
import gameService from '../services/game.service';
import { getDate } from '../services/util.service';
import { v4 as uuid } from 'uuid';
import CheckBox from '@react-native-community/checkbox';
import { Card } from '@rneui/themed';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from '../components/constants/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { constants } from 'buffer';
import { colors, genreList, platformList } from '../components/constants/Constants';
import { MultiSelect } from 'react-native-element-dropdown';
import MultiSelectComponent from '../components/Elements/MultiSelectComponent';

type ScreenProps = NativeStackScreenProps<ParamList, 'Add'>;

const AddScreen = ({ route, navigation }: ScreenProps) => {
  const [game_id, setGame_id] = useState<string>(uuid());
  const [name, setName] = useState<string>('');
  const [genre, setGenre] = useState<string[]>(['']);
  const [added_on, setAdded_on] = useState<string>(getDate());
  const [price, setPrice] = useState<number>(0);
  const [msrp, setMsrp] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [user_rating, setUserRating] = useState<number>(0);
  const [critic_rating, setCriticRating] = useState<number>(0);
  const [platforms, setPlatform] = useState<string[]>(['']);
  const [multiplayer, setMultiplayer] = useState<boolean>(false);
  const [coop, setCoop] = useState<string>('');
  const [playtime, setPlaytime] = useState<number>(0);
  const [completiontime, setCompletiontime] = useState<number>(0);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [physical, setPhysical] = useState<boolean>(false);
  const [picture, setPicture] = useState<string>('');

  const onSubmit = async () => {
    console.log('onSubmit');
    await gameService.addGame({ game_id, name, genre, added_on, price, msrp, rating, user_rating, critic_rating, platforms, multiplayer, coop, playtime, completiontime, favorite, physical, picture });
    navigation.navigate('Home', { update: true });
  }

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <Card wrapperStyle={styles.gamecard} containerStyle={styles.gamecardContainer}>
          <ScrollView>
            <Text style={styles.textLabel}>Add Game</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: '50%', justifyContent: 'space-evenly' }}>
                <Text style={styles.textLabel}>Name:</Text>
                <Text style={styles.textLabel}>Genre(s):</Text>
                <Text style={styles.textLabel}>Price Bought:</Text>
                <Text style={styles.textLabel}>Price Full:</Text>
                <Text style={styles.textLabel}><Icon name="clock-o" size={20} /></Text>
                <Text style={styles.textLabel}>Completiontime:</Text>
                <Text style={styles.textLabel}>Rating:</Text>
                <Text style={styles.textLabel}>User Rating:</Text>
                <Text style={styles.textLabel}>Critic Rating: </Text>
                <Text style={styles.textLabel}>Platforms:</Text>
                <Text style={styles.textLabel}>Multiplayer: </Text>
                <Text style={styles.textLabel}>Coop:</Text>
                <Text style={styles.textLabel}>Physical:</Text>
                <Text style={styles.textLabel}>Picture:</Text>
              </View>
              <View style={{ width: '50%', justifyContent: 'space-evenly' }}>
                <TextInput style={styles.textInput} placeholder="Name" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setName(val)} />
                <MultiSelectComponent onSelectionChange={setGenre} valueList={genreList} />
                <TextInput style={styles.textInput} placeholder="Price" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setPrice(Number(val))} />
                <TextInput style={styles.textInput} placeholder="MSRP" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setMsrp(Number(val))} />
                <TextInput style={styles.textInput} placeholder="Playtime" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setPlaytime(Number(val))} />
                <TextInput style={styles.textInput} placeholder="Completiontime" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setCompletiontime(Number(val))} />
                <TextInput style={styles.textInput} placeholder="Rating" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setRating(Number(val))} />
                <TextInput style={styles.textInput} placeholder="User Rating" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setUserRating(Number(val))} />
                <TextInput style={styles.textInput} placeholder="Critic Rating" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setCriticRating(Number(val))} />
                <MultiSelectComponent onSelectionChange={setPlatform} valueList={platformList} />
                <CheckBox style={styles.checkbox} tintColors={{ true: colors.highlightColor, false: 'black' }} value={multiplayer} onValueChange={(val: boolean) => setMultiplayer(val)} />
                <TextInput style={styles.textInput} placeholder="Coop" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setCoop(val)} />
                <CheckBox style={styles.checkbox} tintColors={{ true: colors.highlightColor, false: 'black' }} value={physical} onValueChange={(val: boolean) => setPhysical(val)} />
                <TextInput style={styles.textInput} placeholder="Picture" placeholderTextColor={colors.highlightColor} onChangeText={(val) => setPicture(val)} />
              </View>
            </View>
            <Button title="Add Game" onPress={() => onSubmit()} />
          </ScrollView>
        </Card >
      </SafeAreaView>
    </>
  );
}

export default AddScreen;
