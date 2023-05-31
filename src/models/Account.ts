interface Account {
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    phoneCountryCode: string;
    active: boolean;
    notification: boolean;
    username: string;
    password: string;
}

interface AccountCreated {
    id: string;
}