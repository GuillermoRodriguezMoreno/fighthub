export interface defaultQueryParams {
  page?: number;
  size?: number;
  orderBy?: string;
}

export const defaultEventsQueryParams: defaultQueryParams = {
  page: 0,
  size: 50,
  orderBy: "startDate",
};

export const defaultClubsQueryParams: defaultQueryParams = {
  page: 0,
  size: 50,
  orderBy: "name",
}
