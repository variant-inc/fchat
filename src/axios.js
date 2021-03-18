const axios = require("axios");

const FRESHCHAT_API_DOMAIN = 'https://variant4.freshchat.com'
const FRESHCHAT_API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiIwNjM4ZDE0OC0xMWFiLTQwOGQtYTgwZi1jNDFkZjJmNjE2YTAiLCJleHAiOjE5Mjc5MTAxMDIsIm5iZiI6MCwiaWF0IjoxNjEyNTUwMTAyLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiYzFhYzBiZGQtOTZjZS00OGQ1LWFlYmUtMzFiZmEyOTllOTM4Iiwic3ViIjoiZmU5ZWRhNDktNTMzZS00OTNhLTlkMDYtYTAyZjdjYTNjYjk0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYzFhYzBiZGQtOTZjZS00OGQ1LWFlYmUtMzFiZmEyOTllOTM4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMDE0ZjliNmMtZjUzNy00NmE0LWI2YjAtZmE4M2Y3MTE1OWVlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Y3JlYXRlIG1lc3NhZ2U6Z2V0IHVzZXI6ZGVsZXRlIGZpbHRlcmluYm94OmNvdW50OnJlYWQgdXNlcjp1cGRhdGUgcm9sZTpyZWFkIGltYWdlOnVwbG9hZCBiaWxsaW5nOnVwZGF0ZSByZXBvcnRzOmV4dHJhY3QgY29udmVyc2F0aW9uOnJlYWQgZGFzaGJvYXJkOnJlYWQgcmVwb3J0czpleHRyYWN0OnJlYWQgcmVwb3J0czpyZWFkIGFnZW50OnJlYWQgZmlsdGVyaW5ib3g6cmVhZCBjb252ZXJzYXRpb246dXBkYXRlIGNvbnZlcnNhdGlvbjpjcmVhdGUgYWdlbnQ6ZGVsZXRlIG91dGJvdW5kbWVzc2FnZTpnZXQgb3V0Ym91bmRtZXNzYWdlOnNlbmQgdXNlcjpjcmVhdGUgcmVwb3J0czpmZXRjaCB1c2VyOnJlYWQiLCJjbGllbnRJZCI6ImMxYWMwYmRkLTk2Y2UtNDhkNS1hZWJlLTMxYmZhMjk5ZTkzOCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEzMC4xNDUiLCJjbGllbnRBZGRyZXNzIjoiMTkyLjE2OC4xMzAuMTQ1In0.T2zIW-fqdEjU4N2kjuWx1ZRl8sydiZ7vvTHH_G4avWHHfc3JJgfSxlAz6RoNECHXsLbU_js9XQ5HpR1QxHOtVkQzoF3i7P3nGQehzlfqM4F0BEDXiYLi-Lr1DQNaz6OPrEgQpS9KPI_hjg158MMZ1qAPdddDpiYkDhxluX3eqpyq0iisx-gGrNV6VJMXE-VqMDuQOL4kyGVG0WM41rCr_aFUzgubBcxtw-n5lKbT1RztOthsXJAOMhJSQtbB0CCPu9Uex9MC1kWcpG5CNiNnWyB3TFAwyyqICpM3rikWsnZg0miUTBClJxIvSkRwBHKXI0IIUAUKWMDHshTAtRGGBA'
const FRESHCHAT_CONFIG = {
    headers: {
        "Accept": "application/JSON",
        "Authorization": `Bearer ${FRESHCHAT_API_TOKEN}`,
        "Content-Type": "application/JSON",
    }
}

const getUser = async (userId) => {
    const getUserEndpoint = `${FRESHCHAT_API_DOMAIN}/users/${userId}`   // HTML result instead of JSON
    const userList = await doGet(getUserEndpoint, FRESHCHAT_CONFIG)
    console.log("userList ", userList)
};

const getAgents = async () => {
    const getAgentsEndpoint = `${FRESHCHAT_API_DOMAIN}/v2/agents`
    const rslt = await doGet(getAgentsEndpoint, FRESHCHAT_CONFIG)
    const agentIds = rslt.agents.map((agent) => `[${agent.first_name} ${agent.last_name}] - ${agent.id}`)
    console.log("agentIds ", agentIds)
};

const doGet = async (endpoint, config) => {
    try {
        const response = await axios.get(endpoint, config);
        return response.data
    } catch (err) {
        console.error(err);
    }
}

getUser('447654')
getAgents()

