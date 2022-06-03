import { createSlice } from "@reduxjs/toolkit"

const program = createSlice({
    name: "program",
    initialState: {
        programType: null,
        programName: null,
        // exercise: [],
        // createdAt: null,
        // programId: null,
        error: null
    },
    reducers: {
        setProgramType: (store, action) => {
            store.programType = action.payload
        },
        setProgramName: (store, action) => {
            store.programName = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
      }
    }
})

export default program
