const url = process.env.NEXT_PUBLIC_FIGHTHUB_API_URL

export const apiEndpoint = {
    baseUrl: url,
    auth: {
        login: `${url}/auth/authenticate`,
        register: `${url}/auth/register`,
    },
}