import { createRoutine } from 'redux-saga-routines';
import { UserType } from '~../../shared/types/user.interface';

export const fetchUsers = createRoutine<{ users: UserType[] }>('GET_USERS');
