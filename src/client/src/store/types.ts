import { store } from '.';

export type StoreState = ReturnType<typeof store['getState']>;
