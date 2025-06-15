export type EventResponse = {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  profilePicture?: string;
  organizerId: number;
  organizerName: string;
  organizerAddress: string;
  organizerEmail: string;
  organizerPhone: string;
  organizerProfilePicture?: string;
  createdBy?: string;
};

export type EventRequest = {
  id?: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  organizer: {
    id: number;
  };
};

export type NewEventInputs = {
  name: string;
  description: string;
  address: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
};

export type EditEventInputs = NewEventInputs;
