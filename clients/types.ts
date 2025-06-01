export interface defaultQueryParams{
    page?: number
    size?: number
    orderBy?: string
}

export const defaultQueryParams: defaultQueryParams = {
    page: 0,
    size: 25,
    orderBy: "startDate",
};