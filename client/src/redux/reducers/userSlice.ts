import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string,
  id : string,
  roles : string,
  isValidUser : boolean,
}

const initialState: UserState = {
    username: '',
    id : '',
    roles : '',
    isValidUser : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state , action) => {
      return {...state , ...action.payload}
    },
    remove: (state) => {
return{   id : '' ,
      roles: '',
    username : '',
  isValidUser : false
  }
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = userSlice.actions

export default userSlice.reducer