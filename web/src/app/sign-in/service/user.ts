export interface User {
    name: string;
    userId?: number;
    email: string;
    notifications?: boolean;
    daysBeforeDue?: number;
}