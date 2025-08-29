// OutputService handles all CLI rendering of cards and hands
// SRP: only responsible for formatting and printing

import type Card from "@/domain/card/Card.js";
import type Hand from "@/domain/card/Hand.js";

class OutputService {
  constructor() {
    // optional: store colors, styles, output stream
  }

  // render a single card
  public renderCard({ card }: { card: Card }): string {
    return card.toString();
  }

  /**
   * render a hand
   * hideHole => if true => hide dealer second card
   */
  public renderHand({
    hand,
    hideHole,
  }: {
    hand: Hand;
    hideHole: boolean;
  }): string {
    // output string
    const output: string[] = [];

    const cards: Card[] = hand.getCards();

    // loop and decide which card is hidden and what to show
    for (let i = 0; i < cards.length; i++) {
      // i = the index of card => 0 = first card and second = 1

      // if: hideHole = true and second card => hide it
      if (hideHole && i === 1) output.push("?");
      else output.push(this.renderCard({ card: cards[i]! }));
    }

    // join output and return a string
    return output.join(" ");
  }

  // render the hand total score
  public renderScore({ hand }: { hand: Hand }): string {
    return hand.score.toString();
  }

  // print hand with score
  public printHand({
    ownerName,
    hand,
    hideHole,
  }: {
    ownerName: string;
    hand: Hand;
    hideHole: boolean;
  }) {
    // print owner name and hand
    const line1 =
      ownerName + ": " + this.renderHand({ hand: hand, hideHole: true });

    // print score => if a card hidden => can't show the score
    const line2 =
      "Score: " + (hideHole ? "??" : this.renderScore({ hand: hand }));

    console.log("\n===========================\n");
    console.log(line1);
    console.log("\n===========================\n");
    console.log(line2);
  }
}

export default OutputService;
