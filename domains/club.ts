export type ClubResponse = {
    id?: number;
    name: string;
    address: string;
    email: string;
    description: string;
    phone: string;
    ownerId?: number;
    ownerName: string;
    ownerUsername: string;
    ownerEmail: string;
};
