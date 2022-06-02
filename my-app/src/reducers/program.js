import { createSlice } from "@reduxjs/toolkit"

const programs = createSlice({
    name: "programs",
    initialState: {
        programs: [],
        error: null
    },
    reducers: {
        setPrograms: (store, action) => {
            store.programs = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
      }
    }
})

export default programs
