import { configureStore, createSlice } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

const test = createSlice({
    name: 'test',
    initialState: {
        count: 0,
    },
    reducers: {
        increment: state => {
            state.count += 1;
        },
    },
});

export default configureStore({
    reducer: {
        test: test.reducer,
    },
});

export const { increment } = test.actions;
