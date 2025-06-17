const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fighthub-two.vercel.app";

export const path = {
  home: `${baseUrl}/`,
  signin: `${baseUrl}/signin`,
  signup: `${baseUrl}/signup`,
  activateAccount: `${baseUrl}/activate-account`,
  dashboard: {
    base: `${baseUrl}/dashboard`,
    admin: `${baseUrl}/dashboard/admin`,
    clubs: {
      base: `${baseUrl}/dashboard/clubs`,
      all: `${baseUrl}/dashboard/clubs/all`,
      myClubs: `${baseUrl}/dashboard/clubs/my-clubs`,
      new: `${baseUrl}/dashboard/clubs/new`,
    },
    events: {
      base: `${baseUrl}/dashboard/events`,
      all: `${baseUrl}/dashboard/events/all`,
      myEvents: `${baseUrl}/dashboard/events/my-events`,
      new: `${baseUrl}/dashboard/events/new`,
    },
    fighters: {
      base: `${baseUrl}/dashboard/fighters`,
      all: `${baseUrl}/dashboard/fighters/all`,
      myFighters: `${baseUrl}/dashboard/fighters/my-fighters`,
    },
    fights: {
      base: `${baseUrl}/dashboard/fights`,
      myFights: `${baseUrl}/dashboard/fights/my-fights`,
      all: `${baseUrl}/dashboard/fights/all`,
    },
    account: {
      base: `${baseUrl}/dashboard/account`,
    },
    fighterMatcher: {
      base: `${baseUrl}/dashboard/fighter-matcher`,
      opponents: `${baseUrl}/dashboard/fighter-matcher/opponents`,
    },
  },
};
