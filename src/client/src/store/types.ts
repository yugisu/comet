import { configureStore } from '.';

export type StoreState = ReturnType<ReturnType<typeof configureStore>['getState']>;
