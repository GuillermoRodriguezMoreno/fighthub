import { activateAccount } from "@/clients/auth-client";

const url = process.env.NEXT_PUBLIC_FIGHTHUB_API_URL;

export const apiEndpoint = {
  baseUrl: url,
  auth: {
    login: `${url}/auth/authenticate`,
    register: `${url}/auth/register`,
    activateAccount: `${url}/auth/activate-account`,
  },
  events: `${url}/events`,
  fighters: `${url}/fighter-profiles`,
  clubs: `${url}/clubs`,
  categories: `${url}/categories`,
  fights: `${url}/fights`,
  styles: `${url}/styles`,
  users: `${url}/users`,
  roles: `${url}/roles`,
  fighterMatching: `${url}/fighter-matching`,
};
