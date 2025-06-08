export type EventResponse = {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  organizerId: number;
  organizerName: string;
  organizerAddress: string;
  organizerEmail: string;
  organizerPhone: string;
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
