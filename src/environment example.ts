const healthCheckWebhook = "https://discord.com/your/server/information";
const discordWebhook = "https://discord.com/your/server/information";
const intervalInMilliseconds = 1000 * 60 * 5;
const maxServiceCallsInARow = 10;
const serviceCallsResetInMilliseconds = 1000;
const serviceName = "my-service";
const port = 3000;

export default {
    port,
    serviceName,
    discordWebhook,
    intervalInMilliseconds, 
    healthCheckWebhook, 
    maxServiceCallsInARow, 
    serviceCallsResetInMilliseconds
};