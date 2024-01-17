import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { Card } from '@rneui/themed';

import styles from "../constants/Styles";
import { Game } from "../../types/types";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialIcons";
import gameService from "../../services/game.service";
import { colors, sizes } from "../constants/Constants";
import ButtonThemed from "../Elements/ButtonThemed";
import DropdownList from "../Elements/DropdownList";
import { useData } from "../constants/DataContext";

type Props = {
    game: Game;
    deleteItem: (id: string) => void;
    updateScreen: () => void;
    navigation: any
};

const GameCard = ({ game, deleteItem, navigation, updateScreen }: Props) => {
    const { updateData, setUpdateData } = useData();

    return (
        <Card wrapperStyle={styles.gamecard} containerStyle={styles.gamecardContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Card.Title style={styles.gameTitle}>{game.name}</Card.Title>
                {game.favorite ? <Icon style={{ paddingLeft: 60, paddingTop: 5 }} name='heart' size={30} color={colors.iconFavorite} onPress={async () => { await gameService.favoriteGame(game.game_id); updateScreen(); setUpdateData(true); }} /> : <Icon style={{ paddingLeft: 60, paddingTop: 5 }} name='heart-o' size={30} color={colors.iconFavorite} onPress={async () => { await gameService.favoriteGame(game.game_id); updateScreen(); setUpdateData(true); }} />}
            </View>
            <Card.Divider />
            <View style={styles.gamecardInternal}>
                <View style={{ width: "35%", flexDirection: 'column', flex: 1 }}>
                    <View style={{ height: (sizes.cardHeight * .8) }}>
                        {game.picture ?
                            <Image
                                style={{ height: (sizes.cardHeight * .7), width: 'auto', borderRadius: sizes.radius / 2 }}
                                resizeMode="contain"
                                source={{ uri: game.picture }}
                            /> :
                            <Image
                                style={{ height: (sizes.cardHeight * .7), width: 'auto', borderRadius: sizes.radius / 2 }}
                                resizeMode="contain"
                                source={require('../../assets/placeholder.webp')}
                            />
                        }
                    </View>
                    <View style={{ height: (sizes.cardHeight * .2) }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <MIcon style={{ textAlign: 'center', marginHorizontal: 'auto', width: "50%", flex: 1, paddingTop: 3 }} name="edit" size={30} color={colors.iconCards} onPress={() => navigation.navigate('Edit', { gameId: game.game_id })} />
                            <Icon style={{ textAlign: 'center', marginHorizontal: "auto", width: "50%", flex: 1, paddingTop: 3 }} name="trash" size={30} color={colors.iconCards} onPress={() => deleteItem(game.game_id)} />
                        </View>
                    </View>
                </View>
                <View style={{ width: "65%", height: (sizes.cardHeight * .2) }}>
                    <View style={{ flexDirection: 'row', height: (sizes.cardHeight * .8) }}>
                        <View style={{ width: '55%', alignSelf: 'stretch' }}>
                            <Text style={styles.textLabel}>Genre(s):</Text>
                            <Text style={styles.textLabel}><Icon name="clock-o" size={20} /></Text>
                            <Text style={styles.textLabel}>Rating:</Text>
                            <Text style={styles.textLabel}>Price:</Text>
                            <Text style={styles.textLabel}>Added On:</Text>
                        </View>
                        <View style={{ width: '45%', alignSelf: 'stretch' }}>
                            <DropdownList genres={game.genre} />
                            {/* <Text style={styles.textGenre}>{game.genre.toString()}</Text> */}
                            <Text style={styles.textGame}>{game.playtime ? game.playtime : <Icon name="eye-slash" size={20} />} min.</Text>
                            <Text style={styles.textGame}>{game.rating ? game.rating : <Icon name="eye-slash" size={20} />}/10</Text>
                            <Text style={styles.textGame}>{game.price ? game.price : <Icon name="eye-slash" size={20} />} / {game.msrp ? game.msrp : <Icon name="eye-slash" size={20} />} €</Text>
                            <Text style={styles.textGame}>{game.added_on}</Text>
                        </View>
                    </View>
                    <View style={{ height: (sizes.cardHeight * .2), paddingHorizontal: 5 }}>
                        {/* <Button
                        title="Go to Details"
                        onPress={() => navigation.navigate('Details', { gameId: game.game_id })}
                    /> */}
                        <ButtonThemed
                            title="Go to Details"
                            color={colors.highlightColor}
                            textcolor='white'
                            width='90%'
                            borderRadius={16}
                            marginBottom={2}
                            marginTop={2}
                            onPress={() => navigation.navigate('Details', { gameId: game.game_id })}
                        />
                    </View>
                </View>
            </View>
        </Card >
    );
}

export default GameCard;