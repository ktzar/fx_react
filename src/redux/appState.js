import { createAction, handleActions } from "redux-actions";
import { eventChannel } from "redux-saga";
import { select, take, put, call } from "redux-saga/effects";

const initialState = {};

export const appLoaded = createAction("APP_LOADED");

export const appStateReducer = handleActions({}, initialState);
