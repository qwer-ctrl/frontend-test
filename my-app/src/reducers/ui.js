import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
	name: 'ui',
	initialState: {
		isLoading: false,
		showDeleteProgramModal: false,
		showUpdateProgramModal: false,
		showAddExerciseModal: false,
		showEditExerciseModal: false,
		showDeleteExerciseModal: false,
		currentModalId: null,
		currentAddExerciseModalId: null,
	},
	reducers: {
		setLoading: (store, action) => {
			store.isLoading = action.payload
		},
		setShowDeleteProgramModal: (store, action) => {
			store.showDeleteProgramModal = action.payload
		},
		setShowUpdateProgramModal: (store, action) => {
			store.showUpdateProgramModal = action.payload
		},
		setShowAddExerciseModal: (store, action) => {
			store.showAddExerciseModal = action.payload
		},
		setShowEditExerciseModal: (store, action) => {
			store.showEditExerciseModal = action.payload
		},
		setShowDeleteExerciseModal: (store, action) => {
			store.showDeleteExerciseModal = action.payload
		},
		setCurrentModalId: (store, action) => {
			store.currentModalId = action.payload
		},
		setCurrentAddExerciseModalId: (store, action) => {
			store.currentAddExerciseModalId = action.payload
		},
	},
})

export default ui
