export interface User {
    name: string;
    userId?: string;
    email: string;
    notifications?: boolean;
    daysBeforeDue?: number;
}