export interface IState {
    initialAmount: number;
    period: number;
    growthRate: number;
    periodContribution: number;
}

export const defaultState = {
    initialAmount: 100,
    period: 10,
    growthRate: 5,
    periodContribution: 100
};
