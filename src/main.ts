import environment from "./environment";
import { interval, retry } from "rxjs";
import { getNyseHalts } from "./feature/api/nyseApi";
import list from "./ticker-list";
import { postHalt } from "./feature/webhook/discordMessageFormatter";
import { NyseHalt, NyseHalts } from "./feature/api/model";
import { MGClient } from "moongoose-client";
import { DClient } from "discord-client";
import datastoreGenerator from "./feature/datastore/datastore";
import express, { Request, Response } from "express";

const app = express();
app.get('/healthcheck', (req: Request, res: Response) => {
    const status = { status: "up" }
    res.json(status);
    res.send();
});

app.listen(environment.port, () => {
    console.log(`Server is running on http://localhost:${environment.port}`);
});


MGClient.initialize({
    callsResetAfterMilliseconds: environment.serviceCallsResetInMilliseconds,
    maxCalls: environment.maxServiceCallsInARow
});

const tickerStores = list.map(ticker => datastoreGenerator(ticker));

DClient.initialize(environment.serviceName, environment.healthCheckWebhook, environment.discordWebhook);
DClient.healthPost("starting up").subscribe(res => console.log(res), err => console.log("error"));

const compareResults = (halts: NyseHalts) => {
    const relevantHalts = halts?.results?.tradeHalts.filter((halt: NyseHalt) => tickerStores.some(store => store.getName().toLowerCase() === halt.symbol.toLowerCase()));

    relevantHalts.forEach(halt => {
        if (haltNotExpired(halt)) {
            const relevantStore = tickerStores.find(store => store.getName().toLowerCase() === halt.symbol.toLowerCase());
            if (!relevantStore?.isEqual(halt)) {
                relevantStore?.store(halt);
                postHalt(halt)
            }
        }
    });
};

const haltNotExpired = (halt: NyseHalt): boolean => {
    const currentTime = new Date();
    const haltDateTime = new Date(`${halt.formatedHaltDate}T${halt.formatedHaltTime}`);
    const resumptionDateTime = halt.formatedResumptionDate && halt.formatedResumptionTime
        ? new Date(`${halt.formatedResumptionDate}T${halt.formatedResumptionTime}`)
        : null;

    return currentTime > haltDateTime && (!resumptionDateTime || currentTime < resumptionDateTime);
}

const handleError = (error: any) => {
    console.log(error);
    DClient.healthPost(error).subscribe({ error: (err: any) => { console.log(error) } });
};



const checkUpdates = () => {
    getNyseHalts().pipe(retry(3)).subscribe({
        next: (halts: NyseHalts) => compareResults(halts),
        error: handleError
    });
};

const main = () => {
    interval(environment.intervalInMilliseconds).subscribe({
        next: () => checkUpdates(),
        error: handleError
    });
};

main();


export default main;
