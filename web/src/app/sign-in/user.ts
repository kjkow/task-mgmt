import { SocialUser } from "angular4-social-login";

export class User extends SocialUser {
    notifications?: boolean;
    daysBeforeDue?: number;
}