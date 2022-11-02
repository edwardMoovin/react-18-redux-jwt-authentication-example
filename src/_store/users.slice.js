import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
        users: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
      saveWord: saveWord(),
      getWords: getWords()
    };

    function saveWord() {
          return createAsyncThunk(
              `${name}/encrypt`,
              async ({ word }) => await fetchWrapper.post(`${baseUrl}/encrypt`, { word })
          );
    }

    function getWords() {
          return createAsyncThunk(
              `${name}/words`,
              async () => await fetchWrapper.get(`${baseUrl}/words`)
          );
    }
}

function createExtraReducers() {
    return {
      ...saveWord(),
      ...getWords()
    };

    function saveWord() {
        var { pending, fulfilled, rejected } = extraActions.saveWord;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
    function getWords() {
          var { pending, fulfilled, rejected } = extraActions.getWords;
          return {
              [pending]: (state) => {
                  state.users = { loading: true };
              },
              [fulfilled]: (state, action) => {
                  state.users = action.payload;
              },
              [rejected]: (state, action) => {
                  state.users = { error: action.error };
              }
          };
      }
}
