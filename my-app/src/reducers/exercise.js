import { createSlice } from '@reduxjs/toolkit'

const exercise = createSlice({
	name: 'exercise',
	initialState: {
		exercise: null,
		sets: null,
		reps: null,
		weights: null,
		comments: null,
		exerciseLink: null,
		seconds: null,
		minutes: null,
		duration: null,
		exerciseLength: null,
		createdAt: null,
		exerciseId: null,
		error: null,
	},
	reducers: {
		setExercise: (store, action) => {
			store.exercise = action.payload
		},
		setSets: (store, action) => {
			store.sets = action.payload
		},
		setReps: (store, action) => {
			store.reps = action.payload
		},
		setWeights: (store, action) => {
			store.weights = action.payload
		},
		setComments: (store, action) => {
			store.comments = action.payload
		},
		setSeconds: (store, action) => {
			store.seconds = action.payload
		},
		setMinutes: (store, action) => {
			store.minutes = action.payload
		},
		setDuration: (store, action) => {
			store.duration = action.payload
		},
		setExerciseLength: (store, action) => {
			store.length = action.payload
		},
		setExerciseLink: (store, action) => {
			store.link = action.payload
		},
		setCreatedAt: (store, action) => {
			store.createdAt = action.payload
		},
		setExerciseId: (store, action) => {
			store.exerciseId = action.payload
		},
		setError: (store, action) => {
			store.error = action.payload
		},
	},
})

export default exercise
