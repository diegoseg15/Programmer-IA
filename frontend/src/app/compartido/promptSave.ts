import { Message } from "./message";

export class PromptSave {
    userId: String;
    model: string;
    messages: Message[]

    constructor() {
        this.userId = "";
        this.model = "";
        this.messages = [];
    }
}