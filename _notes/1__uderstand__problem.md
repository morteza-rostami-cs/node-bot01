<!--

# what is blackjack? (card-game)

  # a card game between Player(s) and a dealer
  # each player and the dealer => tries to get as close to 21 points => without going over 21 (Busting)

  # card values:
    # 2-10 => face value (what ever is on the card)
    # j, Q, k => 10
    # Ace => 1 or 11 => whichever benefits the hand
      # meaning if we are going over 21 => Ace = 1
      # else: Ace = 11

# so: each player who get closer to 21 compare to dealer => without busting => wins
  eg: player 17 and dealer 14 and Stands  => player wins
  eg: player 17 and dealer 22 (BUST!) => player wins

# Game flow:
  # player(s) place bets
  # Dealing:
    dealer plays 2 cards for each player.
    dealer plays 2 cards for himself.
      # one face-off and one face-down
  # player turn:
    # hit => take another card
      ## player can hit as many times -> repeat as long as total <= 21
    # stand/stop => keep the current total.

    #double and split (later)

  # dealer turn:
    # flips the hidden card:
    # hit until total is 17-21 inclusive
      # dealer stop and compares:
        # dealer > player => dealer wins
        # player > dealer => player wins
        # dealer = player => push
    # if: dealer BUST
      # all non busted players WIN

  ## so dealer can stop with 2 cards or keep hitting => until 17-21

  # scoring outcome:
    # player hand > dealer hand => Player wins => pays 1:1
      # 1/1 = 1 => so: player bets 10$ => 1 * 10 = 10$ win
    # dealer hand > player hand => dealer wins => player loses their hand
      # player lose 10$
    # equal totals => Push (tie, no one wins) => they get their bet back
    # player get 21 with 2 cards => (Ace + 10-value) ->Blackjack => pays 3:2
      # eg: player bet 10$ => 1.5 * 10 = 15$ => basically 3/2 * 10
    # dealer blackjack:
      # beats all non-blackjack hands:
        # player bet 10$ -> loses 10$
      # tie with blackjack hands: push

# the only time you can get a Blackjack is => with the first 2 cards!
  Ace + a 10 value card

# after that is not possible to blackJack
  eg: 2 + Ace + King => 2 + 11 + 10 = 23 => BUST => BUT Ace goes to 1 => so: you get: 2 + 1 + 10 = 13

#=============================================
#=============================================
#=============================================

# architecture:
==============

Card (value, suit)

Deck (collection of cards, shuffle, draw)

Hand (collection of cards belonging to Player/Dealer, calculate score with Ace logic)

Player (has a hand, takes actions)

Dealer (special kind of player with fixed rules for actions)

Game (coordinates everything: setup, turns, results)



-->
