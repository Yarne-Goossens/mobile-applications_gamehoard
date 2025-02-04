import {Game} from '../model/game';

let collection: Game[];

collection = [
  {
    game_id: '1',
    name: 'God of War',
    genre: ['Action'],
    price: 10,
    added_on: '',
  },
  {game_id: '2', name: 'Among Us', genre: ['Comedy'], price: 5, added_on: ''},
  {
    game_id: '3',
    name: 'Risk of Rain',
    genre: ['Rogue-Like'],
    price: 20,
    added_on: '',
  },
];

const setCollection = (collection_new: Game[]) => {
  collection = collection_new;
};

const getCollection = () => {
  return collection;
};

export default {getCollection, setCollection};
