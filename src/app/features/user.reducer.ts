
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "../interfaces/User.interfaces";


const initialState: UserState = {
    user: {} as User,
    selectedUser: {} as User,
    allUsers: [],
    isAuthorized: false
}


export const userSlice = createSlice({
    name: "user-slice",
    initialState,
        reducers: {
            setUser(state, user: PayloadAction<User>){
                state.user = user.payload;
                state.isAuthorized = true;
            },
            setIsAuthorized(state, isAuthorized: PayloadAction<boolean>) {
                state.isAuthorized = isAuthorized.payload;
            },
            setAllUsers(state, allUsers: PayloadAction<User[]>){
                state.allUsers = allUsers.payload;
            },
            removeUser(state){
                state.user = {} as User;
                state.isAuthorized = false;
            },
            setSelectedUser(state, email: PayloadAction<string>){
                const userForEdit = state.allUsers.find((user: User) => user.email === email.payload);
                state.selectedUser = userForEdit as User;
            },
        }
})


export const { setUser, setIsAuthorized, setAllUsers, removeUser, setSelectedUser } = userSlice.actions

export default userSlice.reducer