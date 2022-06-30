import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
	name: 'user',
	initialState: {
		userId: null,
		username: null,
		program: [],
		accessToken: null,
		error: null,
		workoutCounter: 0,
	},
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload
		},
		setUserName: (store, action) => {
			store.username = action.payload
		},
		setProgram: (store, action) => {
			store.program = action.payload
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload
		},
		setError: (store, action) => {
			store.error = action.payload
		},
		setWorkoutCounter: (store, action) => {
			if (action.payload === store.userId) {
				store.workoutCounter++
			}
		},
	},
})

export default user
