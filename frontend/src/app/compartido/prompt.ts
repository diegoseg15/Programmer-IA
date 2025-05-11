import { Message } from "./message";

export class Prompt {
    model: string;
    messages: Message[]

    constructor() {
        this.model = "";
        this.messages = [];
    }
}