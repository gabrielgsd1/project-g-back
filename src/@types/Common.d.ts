type ReturnTuple<T, U = any> = [error: U, data: null] | [error: null, data: T];
