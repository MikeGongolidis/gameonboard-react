import json
import secrets
import asyncio

from collections import OrderedDict

from communication import MessageModel, MessageEnum, GameEnum, PlayerEnum
from game import TicTacToe, Connect4

import logging
logger = logging.getLogger(__name__)

def put(dictionary,item):
    dictionary[item] = 1

class LobbyRoom():

    def __init__(self):
        self.ttt_queue = OrderedDict()
        self.c4_queue = OrderedDict()
        self.rooms = {} # dictionary that has a set of the sockets that are present in that room. key is room_id, values is sockets.
        self.games = {} # dictionary that has room_ids as keys and game classes as values
        self.player_to_room_id = {} #dictionary that maps each socket to the room_id that is present now.


    def create_private_room(self, player1, game_type):
        """
        Creates a new room with a unique id, adds the room in the rooms dictionary
        and returns the room_id.
        """
        room_id = secrets.token_urlsafe(12)

        self.rooms[room_id] = {player1}
        if game_type == GameEnum.TTT.value:
            self.games[room_id] = TicTacToe()
        else:
            self.games[room_id] = Connect4()
        
        self.player_to_room_id[player1] = room_id

        return room_id
    
    def add_player2_in_private_room_and_start_game(self, player2, room_id:str):

        self.rooms[room_id].add(player2)
        self.player_to_room_id[player2] = room_id
        
        #This runs twice, once per player
        return [(player,code) for player,code in zip(self.rooms[room_id],[1,2])]

    
    def remove_room_id(self, player):


        room_id = self.player_to_room_id[player]
        logger.info(f"Deleting room {room_id} from Lobby")

        logger.info(f'Number of rooms before: {len(self.rooms)}')

        del self.rooms[room_id]
        del self.games[room_id]
        logger.info(f'Number of rooms after: {len(self.rooms)}')

    def find_opponent(self, player, game_type):

        try:
            if player in self.ttt_queue or player in self.c4_queue:
                return None
                
            player1 = self.ttt_queue.popitem(last=False)[0] if game_type == GameEnum.TTT.value else self.c4_queue.popitem(last=False)[0]

            room_id = self.create_private_room(player1, game_type)

            return self.add_player2_in_private_room_and_start_game(player, room_id)

        except KeyError:

            put(self.ttt_queue,player) if game_type == GameEnum.TTT.value else put(self.c4_queue,player)

            return None

    
    def exit_queue(self, player, message):
        """
        Currently deletes the websocket from the queue.
        """
        if message.game_type == 2:
            del self.c4_queue[player]
        else:
            del self.ttt_queue[player]


    def find_enemy(self,player):
        """
        Return the enemy of the given player
        """
        #Get the room_id of the player
        room_id = self.player_to_room_id[player]
        #Get the second player
        players = self.rooms[room_id]
        print(f"{player} is leaving, we need to notify {list(players.difference(set({player})))[0]}")
        return list(players.difference(set({player})))[0]

    def cleanup_game(self,player1,player2):
        """
        Delete information of a game that got exited
        """
        print(f"Cleaning up game for {player1}")
        room_id = self.player_to_room_id[player1]

        del self.rooms[room_id]
        del self.games[room_id]
        del self.player_to_room_id[player1]
        del self.player_to_room_id[player2]

