export interface IMealForm {
    mealTime: string;
    mealDescription: string;
    calories: number;
}

export interface IMeal extends IMealForm {
    id: string;
}

export interface IMealAPI {
    [key: string]: IMeal;
}