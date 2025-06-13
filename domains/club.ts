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

export type NewClubInputs = {
  name: string;
  address: string;
  email: string;
  description: string;
  phone: string;
};

export type ClubRequest = {
  id?: number;
  name: string;
  address: string;
  email: string;
  description: string;
  phone: string;
  owner: {
    id: number;
  };
};
