import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loggedUser: "",
  todoList: []
};

const registerLogin = (state, action) => {
  return {
    ...state,
    loggedUser: action.payload,
  };
};

export const fetchToDoListFromSlice = createAsyncThunk(
    "todo/fetchList",
    async (name, { rejectWithValue }) => {
      try {
        console.log('name...... ', name)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    (data) => data.json()
    )
        return res;
      } catch (err) {
        return rejectWithValue([], err);
      }
    }
  );


const loginReducer = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
      registerLoginActionFromSlice(state, action) {
        return registerLogin(state, action)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToDoListFromSlice.fulfilled, (state, action) => {
              state.todoList.push(action.payload[0].title)
        })
    }
  })

export default loginReducer.reducer
export const { registerLoginActionFromSlice } = loginReducer.actions
