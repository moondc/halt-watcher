import { NyseHalt } from "../api/model";
import { DClient } from "discord-client";

export const postHalt = (halt: NyseHalt) => {
    const content = generateMessage(halt);
    DClient.statusPost([], content, []).subscribe();
}

const generateMessage = (halt: NyseHalt): string => {
    let stringbuilder = `New ${halt.symbol} halt\n`;
    stringbuilder += `Reason:             ${halt.reason}\n`;
    stringbuilder += `Started:            ${halt.formatedHaltTime}\n`;
    if (halt.formatedResumptionTime) {
        stringbuilder += `Ending:             ${halt.formatedResumptionTime}`;
    }
    else {
        const estimatedTime = addFiveMinutes(halt.formatedHaltTime);
        stringbuilder += `Ending Guess: ${estimatedTime}`
    }

    return stringbuilder;
}
const addFiveMinutes = (timeString: string): string => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + 5;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${seconds}`;
}