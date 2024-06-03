import { Observable } from "rxjs";
import { MGClient } from "moongoose-client";
import { NyseHalts } from "./model";

export const getNyseHalts = (): Observable<NyseHalts> => {
    return MGClient.get("https://www.nyse.com/api/trade-halts/current?filterToken=&max=50&offset=0&pageNumber=1&sortOrder=up&sortType=")
}
