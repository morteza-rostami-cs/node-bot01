import TelegramBot from 'node-telegram-bot-api';
import type { ITelegramBotPort, TextHandler } from '../ports/ITelegramBotPort';
import { AppError } from '@/shared/errors/AppError.js';
import { logger } from '@/infra/logging/Logger.js';

export class TelegramBotAdaptor implements ITelegramBotPort {
  // telegram instance
  private bot: TelegramBot;
  private polling: boolean;

  constructor({ token, polling = true }: { token: string; polling: boolean }) {
    if (!token) throw new AppError({ message: 'Telegram token missing', statusCode: 400 });

    this.polling = polling;

    // setup a bot instance => passing: bot token, uses polling for message update
    this.bot = new TelegramBot(token, { polling });

    // basic error handling
    this.bot.on('polling_error', (error) => {
      logger.error('Telegram polling error', error);
    });

    // web hook error
    this.bot.on('webhook_error', (error) => {
      logger.error('telegram webhook error', error);
    });
  }

  // telegram bot start event
  public async start(): Promise<void> {
    logger.info(`🤖 Telegram bot starts. mode: ${this.polling ? 'polling' : 'webhook'}`);
  }

  public onText({ regex, handler }: { regex: RegExp; handler: TextHandler }): void {
    this.bot.onText(regex, (msg, match) => {
      try {
        const maybe = handler(msg, match ?? null);

        if (maybe && typeof (maybe as Promise<any>).catch === 'function') {
          (maybe as Promise<any>).catch((error) => {
            logger.error('telegram on text handler error', error);
          });
        }
      } catch (error: any) {
        logger.error('telegram on text handler error', error);
      }
    });
  }

  // run a telegram command
  public onCommand({ command, handler }: { command: string; handler: (msg: any) => void }): void {
    this.bot.onText(new RegExp(`^/${command}(?:\\s+(.+))?$`), (msg, match) =>
      handler({ msg, args: match?.[1] }),
    );
  }

  public onMessage({ handler }: { handler: (msg: any) => Promise<void> | void }): void {
    this.bot.on('message', (msg) => {
      try {
        const maybe = handler(msg);
        if (maybe && typeof (maybe as Promise<any>).catch === 'function') {
          (maybe as Promise<any>).catch((err) => {
            logger.error('[Telegram][onMessage handler error]', err);
          });
        }
      } catch (err) {
        logger.error('[Telegram][onMessage handler thrown]', err);
      }
    });
  }

  // send message
  public async sendMessage({ chatId, text }: { chatId: number; text: string }): Promise<void> {
    await this.bot.sendMessage(chatId, text);
  }

  public async stop(): Promise<void> {
    try {
      // stop polling
      // node-telegram-bot-api exposes stopPolling()
      // and close webhooks with closeWebHook(). Use stopPolling here:
      // @ts-ignore
      if (typeof this.bot.stopPolling === 'function') {
        // @ts-ignore
        this.bot.stopPolling();
      }
    } catch (err) {
      logger.error('[Telegram][stop] error:', err);
    }
  }

  public async sendPhoto({
    chatId,
    photoUrl,
    caption,
  }: {
    chatId: number;
    photoUrl: string;
    caption?: string;
  }): Promise<void> {
    try {
      await this.bot.sendPhoto(chatId, photoUrl, { caption });
    } catch (error) {
      logger.error('[Telegram][sendPhoto] error:', error);
      throw error;
    }
  }

  public async getUpdates(
    offset?: number,
    limit?: number,
    timeout?: number,
  ): Promise<TelegramBot.Update[]> {
    try {
      const updates = await this.bot.getUpdates({ offset, limit, timeout });
      return updates;
    } catch (error) {
      logger.error('[Telegram][getUpdates] error:', error);
      throw error;
    }
  }

  public async setWebhook(url: string): Promise<void> {
    try {
      await this.bot.setWebHook(url);
      logger.info(`[Telegram] Webhook set: ${url}`);
    } catch (error) {
      logger.error('[Telegram][setWebhook] error:', error);
      throw error;
    }
  }
}
