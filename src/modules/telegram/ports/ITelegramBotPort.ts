// some callback handler => after running a telegram command
export type TextHandler = (msg: any, match?: RegExpExecArray | null) => Promise<void> | void;

// telegram bot adaptor interface
export interface ITelegramBotPort {
  /**
   * Start the adapter (connect / enable polling or webhook)
   */
  start(): Promise<void>;
  /**
   * Register handler for text commands with regex
   * @param param0
   */
  onText({ regex, handler }: { regex: RegExp; handler: TextHandler }): void;

  onMessage({ handler }: { handler: (msg: any) => Promise<void> | void }): void;

  sendMessage({ chatId, text }: { chatId: number | string; text: string }): Promise<void>;

  onCommand({ command, handler }: { command: string; handler: (msg: any) => void }): void;

  sendPhoto({
    chatId,
    photoUrl,
    caption,
  }: {
    chatId: number;
    photoUrl: string;
    caption?: string;
  }): Promise<void>;

  getUpdates(offset?: number, limit?: number, timeout?: number): Promise<any>;

  setWebhook(url: string): Promise<void>;

  stop(): Promise<void>;
}
