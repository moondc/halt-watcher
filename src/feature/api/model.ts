export interface NyseHalts {
    totalCount: number,
    results: {
        lastUpdatedTime: string,
        total: number,
        tradeHalts: NyseHalt[],
        formatedLastUpdatedTime: string
    }
}

export interface NyseHalt {
    haltTime: "2024-05-31 19:50:31",
    symbol: "PLAG",
    issuerName: "Planet Green Holdings Corp.",
    sourceExchange: "NYSE American",
    reason: "Corporate Action",
    resumptionTime: "2024-06-03 09:05:00",
    resumptionText: string,
    total: any,
    formatedResumptionDate: "2024-06-03",
    formatedResumptionTime: "09:05:00",
    formatedHaltDate: "2024-05-31",
    formatedHaltTime: "19:50:31",
    nonNullResumptionDate: "2024-06-03",
    nonNullResumptionTime: "09:05:00"
}