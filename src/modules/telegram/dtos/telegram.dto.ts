// just a single telegram message
export type TelegramMsgDto = {
  chatId: number;
  text: string;
  username?: string;
};
