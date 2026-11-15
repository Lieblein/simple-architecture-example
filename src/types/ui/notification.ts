export type NotificationType = 'error' | 'success';

export interface INotification {
    id: number;
    message: string;
    type: NotificationType;
}
