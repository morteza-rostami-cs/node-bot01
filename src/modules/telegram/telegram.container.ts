import { config } from '@/config/index.js';
import { AppError } from '@/shared/errors/AppError.js';
import { TelegramBotAdaptor } from './adaptors/telegramBot.adaptor';
import { TelegramBotService } from './telegramBot.service';

const BOT_TOKEN = config.telegram.token;

if (!BOT_TOKEN) throw new AppError({ message: 'Telegram token missing', statusCode: 400 });

export async function buildTelegramContainer() {
  // adaptor
  const adaptor = new TelegramBotAdaptor({ token: BOT_TOKEN, polling: true });

  // telegram service =>connect adaptor
  const tgService = new TelegramBotService({ bot: adaptor });

  // start bot
  await tgService.start();

  // setup start bot command
  tgService.registerStartCommand({ handler: () => {} });

  return { telegramBotService: tgService };
}
