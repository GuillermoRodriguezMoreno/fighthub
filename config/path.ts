const baseUrl = process.env.BASE_URL || "http://localhost:3000";

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
      my_clubs: `${baseUrl}/dashboard/clubs/my-clubs`,
      popular: `${baseUrl}/dashboard/clubs/popular`,
      new: `${baseUrl}/dashboard/clubs/new`,
    },
    events: {
      base: `${baseUrl}/dashboard/events`,
      all: `${baseUrl}/dashboard/events/all`,
      my_events: `${baseUrl}/dashboard/events/my-events`,
      new: `${baseUrl}/dashboard/events/new`,
    },
    fighters: {
      base: `${baseUrl}/dashboard/fighters`,
      all: `${baseUrl}/dashboard/fighters/all`,
      nearest: `${baseUrl}/dashboard/fighters/nearest`,
      popular: `${baseUrl}/dashboard/fighters/popular`,
    },
    fights: {
      base: `${baseUrl}/dashboard/fights`,
      my_fights: `${baseUrl}/dashboard/fights/my-fights`,
      popular: `${baseUrl}/dashboard/fights/popular`,
      new: `${baseUrl}/dashboard/fights/new`,
    },
    profile: {
      base: `${baseUrl}/dashboard/profile`,
    },
  },
};
