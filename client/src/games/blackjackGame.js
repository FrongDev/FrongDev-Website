export default `
import random

SUITS = ["Heart", "Diamond", "Club", "Spade"]
CARD_VALUES = [("Two", 2), ("Three", 3), ("Four", 4), ("Five", 5), ("Six", 6), ("Seven", 7), ("Eight", 8), ("Nine", 9), ("Ten", 10), ("King", 10), ("Queen", 10), ("Jack", 10), ("Ace", 1)]

# Classes

class Card():
  def __init__(self, value, suit, name):
    self.value = value
    self.suit = suit
    self.name = name

  def get_print_str(self):
    return self.name + " of " + self.suit + "s"


class Deck():
  # Full deck
  def __init__(self):
    self.card_arr = []

    for suit in SUITS:
      for (name, value) in CARD_VALUES:
        self.card_arr.append(Card(value, suit, name))

  # Debug only
  def debug_print(self):
    for card in self.card_arr:
      print(card.get_print_str())

  # Shuffle deck
  def shuffle(self):
    random.shuffle(self.card_arr)

  # Draw from top
  def pop_top(self):
    return self.card_arr.pop()
  
  
class Hand():
  def __init__(self):
    self.card_arr = []

  # Print (differing behavior for player vs dealer)
  def print(self, hide_first_card = False):
    if(hide_first_card):
      print("\tUnknown Card")
      for card in self.card_arr[1:]:
        print(f"\t{card.get_print_str()}")

      print(f"\tMinimum Optimal Total: {self.get_optimal_total(consider_first_card = False)}")

    else:
      for card in self.card_arr:
        print(f"\t{card.get_print_str()}")

      print(f"\tOptimal Total: {self.get_optimal_total(consider_first_card = True)}")
      
  # Add card to hand
  def add_card(self, card):
    self.card_arr.append(card)

  # Get optimal total of player's cards (needed cus aces)
  def get_optimal_total(self, consider_first_card = True):
    card_arr = self.card_arr if consider_first_card else self.card_arr[1:]

    total_without_aces = sum(card.value for card in card_arr if not card.name == "Ace")

    num_aces = sum(1 for card in card_arr if card.name == "Ace")

    min_total = total_without_aces + num_aces
    
    for i in range(num_aces):
      if(min_total + 10 <= 21):
        min_total += 10

    return min_total
  
  # Get number of cards in hand
  def get_num_cards(self):
    return len(self.card_arr)



# Game helper functions
  
def clear_screen():
  print("\n\n\n\n\n\n")


def print_line():
  print("\n-----------------------------------------------------------\n")


def print_both_hands(dealer_hand, player_hand, hide_dealer_first = False):
  # Print both hands
  print("Dealer's Hand:")
  dealer_hand.print(hide_dealer_first)

  print("")

  print("Your Hand:")
  player_hand.print()


def print_player_total(player_hand):
  print("")
  print("Your Total: " + str(player_hand.get_optimal_total()))
  print("")


def print_dealer_total(dealer_hand):
  print("Dealer's Total: " + str(dealer_hand.get_optimal_total()))


def is_int(num):
  try:
    val = int(num)

    return True
  except ValueError:
    return False
  
  
def validate_bet(bet_input, money):
  if(not is_int(bet_input)):
    print("That's not a number bro")
    return False
  
  bet = int(bet_input)

  if(bet <= 0):
    print("You can't bet negative or zero frongcoins bro")
    return False
  
  if(bet > money):
    print("You can't bet more than you have bro")
    return False
  
  return True


# Single game
def game(wins, money):
  clear_screen()

  print("Welcome to the casino, let's waste your frongcoins :)")

  if(money == 0):
    print("You lost all of your frongcoins? Cringe.... I'll give you 100 frongcoins")
    money = 100

  # Get player bet
  bet_input = ""
  is_bet_valid = False
  bet = -1

  while(not is_bet_valid):
    print("How many frongcoins do you want to bet? You have " + str(money) + " frongcoins:")

    bet_input = input()

    is_bet_valid = validate_bet(bet_input, money)

    if(is_bet_valid): bet = int(bet_input)

  money -= bet

  # Win / lose functions
  def win(wins, money, bet):
    wins += 1
    money = money + (2 * bet)
    print(f"You won {(2 * bet)} frongcoins!")
    return (wins, money)

  def lose():
    print(f"You lost {bet} frongcoins!")

  # Dealing
  playing_deck = Deck()
  playing_deck.shuffle()
  dealer_hand = Hand()
  player_hand = Hand()

  dealer_hand.add_card(playing_deck.pop_top())
  player_hand.add_card(playing_deck.pop_top())
  dealer_hand.add_card(playing_deck.pop_top())
  player_hand.add_card(playing_deck.pop_top())

  # Turn loop
  stand = False
  over_21 = False

  while(not stand and not over_21):
    print("")
    print_both_hands(dealer_hand, player_hand, hide_dealer_first = True)
    print("")

    # User action
    print("Do you want to hit or stand? (H) for hit, (S) for stand:")

    user_action = input()
    while(not (user_action == "H" or user_action == "S")):
      print("That's not an option bro")
      print("Do you want to hit or stand? (H) for hit, (S) for stand:")
      user_action = input()

    # If the user stands
    if(user_action == "S"):
      stand = True

    # If the user hits
    else:
      player_hand.add_card(playing_deck.pop_top())
      
      if(player_hand.get_optimal_total() > 21):
        over_21 = True

    print_line()


  print_both_hands(dealer_hand, player_hand, hide_dealer_first = False)

  print_player_total(player_hand)

  # Bust
  if(over_21):

    print("You busted! That's a big L for you")
    lose()
    input()
    return (wins, money)
  
  # Dealer draws
  print("Let's see what the dealer gets :)")

  input()

  while(dealer_hand.get_optimal_total() < 17):
    print("Dealer hits:")
    dealer_hand.add_card(playing_deck.pop_top())
    dealer_hand.print(hide_first_card = False)
    input()

  print("The dealer stops drawing\n")

  print_both_hands(dealer_hand, player_hand, hide_dealer_first = False)
  print("")

  # Dealer busts
  if(dealer_hand.get_optimal_total() > 21):
    print("Dealer busted! You win!")
    wins, money = win()
    input()
    return (wins, money)
  
  player_total, player_cards = player_hand.get_optimal_total(), player_hand.get_num_cards()
  dealer_total, dealer_cards = dealer_hand.get_optimal_total(), dealer_hand.get_num_cards()

  # Compare totals to find winner
  if(player_total < dealer_total):
    print("Dealer has a higher total! You lose")
    lose()
    input()
    return (wins, money)
  elif(player_total > dealer_total):
    print("You have a higher total! You win!")
    wins, money = win()
    input()
    return (wins, money)

  # If totals tie compare amount of cards
  if(player_cards < dealer_cards):
    print("You two have the same total but you have less cards! You win")
    wins, money = win()
    input()
    return (wins, money)
  elif(player_cards > dealer_cards):
    print("You two have the same total but you have more cards! You lose")
    lose()
    input()
    return (wins, money)
  else:
    print("You tied in both total and number of cards! You tie this one")
    money += bet
    input()
    return (wins, money)


wins, money = 0, 1000
playing = True
while(playing):
  wins, money = game(wins, money)
  
  print("Do you want to play again? (Y for yes, N for no)")
  answer = input()
  while(not (answer == "Y" or answer == "N")):
    print("Invalid answer")
    print("Do you want to play again? (Y for yes, N for no)")
    answer = input()
  if(answer == "N"):
    print("Bye bye")
    playing = False`;
