import { createAction, handleActions } from "redux-actions";

const initialState = {};

export const appLoaded = createAction("APP_LOADED");

export const appStateReducer = handleActions({}, initialState);
