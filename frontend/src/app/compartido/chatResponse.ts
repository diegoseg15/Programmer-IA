export interface ChatResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
        index: number;
    }[];
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
