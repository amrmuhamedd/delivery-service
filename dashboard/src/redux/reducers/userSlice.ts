import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string,
  id : string,
  roles : string
}

const initialState: UserState = {
    username: '',
    id : '',
    roles : ''
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
    username : ''}
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = userSlice.actions

export default userSlice.reducer