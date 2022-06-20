import { createSlice } from '@reduxjs/toolkit'

export const program = createSlice({
	name: 'program',
	initialState: {
		programType: null,
		programName: null,
		exercise: [],
		createdAt: null,
		programId: null,
		error: null,
	},
	reducers: {
		setProgramType: (store, action) => {
			store.programType = action.payload
		},
		setProgramName: (store, action) => {
			store.programName = action.payload
		},
		setExercise: (store, action) => {
			console.log("action payload from program reducer", action.payload)

			store.exercise = action.payload
			// return {
			// 	...store,
			// 	store.exercise: [action.payload, ...store.exercise]
			// }
		},
		setCreatedAt: (store, action) => {
			store.createdAt = action.payload
		},
		setProgramId: (store, action) => {
			store.programId = action.payload
		},
		setError: (store, action) => {
			store.error = action.payload
		}
	},
})

