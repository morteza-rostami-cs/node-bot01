/**
 * Domain Entity: TelegramUser
 *
 * Represents a Telegram user in our system.
 * - Pure business object (no infrastructure dependencies).
 * - Used in application services, repositories, and domain logic.
 */
export class TelegramUser {
  public readonly id: string; // internal UUID (not Telegram’s ID)
  public readonly telegramId: number; // Telegram user’s ID
  public linkedUserId?: string | undefined; // optional link to system-wide user
  public lastCommand?: string | undefined; // last executed command
  public readonly createdAt: Date; // creation timestamp

  constructor(props: {
    id: string;
    telegramId: number;
    linkedUserId?: string;
    lastCommand?: string;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.telegramId = props.telegramId;
    this.linkedUserId = props.linkedUserId;
    this.lastCommand = props.lastCommand;
    this.createdAt = props.createdAt ?? new Date();
  }

  /**
   * Update last command executed by this user
   */
  updateLastCommand(command: string): void {
    this.lastCommand = command;
  }

  /**
   * Link this Telegram user to an internal system user
   */
  linkUser(userId: string): void {
    this.linkedUserId = userId;
  }
}
