export interface User {
    name: string;
    userId: number;
    email: string;
    token: string;
    notifications?: boolean;
    daysBeforeDue?: number;
}