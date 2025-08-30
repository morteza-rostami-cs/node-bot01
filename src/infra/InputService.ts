/*
# show prompts to user => Hit or Stand ...
# wait for user input => player types something and presses enter
# validate answers => user input
# repeat if invalid input
# close the input when the Game ends

*/

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class InputService {
  protected cli;

  constructor() {
    // basically a node object ->that let's you to interact with terminal
    this.cli = readline.createInterface({ input, output });
  }

  // get input
  public async ask({ prompt }: { prompt: string }): Promise<string> {
    // show prompt and wait for user input
    const user_input = await this.cli.question(`${prompt} \n`);
    return user_input.trim();
  }

  // prompt with options -> wait for input
  public async choose({ prompt, options }: { prompt: string; options: string[] }): Promise<string> {
    // loop until ->correct option or end
    while (true) {
      // show prompt and it's options
      const text = `${prompt}\n [${options.join('/')}]`;

      const user_input = await this.ask({ prompt: text });

      // normalize input
      const normalize = user_input.toLowerCase();

      // check if the option they picked exists
      if (options.includes(normalize)) return normalize;
      else console.log('Invalid choice, please try again.');
    }
  }

  // prompt: with yes and no answer
  public async confirm({ prompt }: { prompt: string }): Promise<boolean> {
    // loop for getting the correct answer
    while (true) {
      const text = `${prompt}: (y/n)`;
      const user_input = await this.ask({ prompt: text });
      const normalize = user_input.toLowerCase();

      if (normalize === 'y' || normalize === 'yes') return true;
      else if (normalize === 'n' || normalize === 'no') return false;

      // keep up the loop until user enters the right answer
      console.log('please answer y/n');
    }
  }

  // close the cli => after done -> Game over
  public close(): void {
    this.cli.close();
  }
}

// singleton => export only one instance of this Utility class
export default new InputService();
export type { InputService };
