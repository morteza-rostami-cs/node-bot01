import { logger } from '@/infra/logging/Logger.js';
import type { ITelegramBotPort } from './ports/ITelegramBotPort';

export class TelegramBotService {
  // bot => an instance of adaptor => relay on port
  private readonly bot: ITelegramBotPort;

  constructor({ bot }: { bot: ITelegramBotPort }) {
    this.bot = bot;
  }

  // start the bot
  public async start(): Promise<void> {
    await this.bot.start();
  }

  public registerStartCommand({ handler }: { handler?: (msg: any) => void }): void {
    this.bot.onText({
      regex: /^\/start(?:\s+(.+))?$/,
      handler: async (msg, match) => {
        try {
          // default behavior
          // msg.chat.id, 'Welcome! Use /help to see commands.'
          await this.bot.sendMessage({
            chatId: msg.chat.id,
            text: 'Welcome! Use /help to see commands.',
          });
          if (handler) handler(msg);
        } catch (err) {
          logger.error('[TelegramBotService][start handler] error', err);
        }
      },
    });
  }

  public registerHelpCommand({ handler }: { handler?: (msg: any) => void }): void {
    // /^\/help(?:\s+(.+))?$/
    this.bot.onText({
      regex: /^\/help(?:\s+(.+))?$/,
      handler: async (msg, match) => {
        try {
          await this.bot.sendMessage({
            chatId: msg.chat.id,
            text: 'Available commands: /start, /help',
          });
          if (handler) handler(msg);
        } catch (err) {
          logger.error('[TelegramBotService][help handler] error', err);
        }
      },
    });
  }

  public onMessage(fn: (msg: any) => Promise<void> | void) {
    this.bot.onMessage({ handler: fn });
  }

  public async reply(chatId: number | string, text: string) {
    await this.bot.sendMessage({ chatId: chatId, text: text });
  }
}
