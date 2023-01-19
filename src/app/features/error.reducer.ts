import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState, Error} from "../interfaces/Error.interfaces";


const initialState: ErrorState = {
    error: {} as Error
}


export const errorSlice = createSlice({
    name: "user-slice",
    initialState,
        reducers: {
            setError(state, error: PayloadAction<Error>){
                state.error = error.payload
            },
        }
})


export const { setError } = errorSlice.actions

export default errorSlice.reducer