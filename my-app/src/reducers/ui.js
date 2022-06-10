import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
	name: 'ui',
	initialState: {
		isLoading: false,
		showEditModal: false,
		showDeleteModal: false,
		showAddExerciseModal: false,
		currentModalId: null,
		currentAddExerciseModalId: null,
	},
	reducers: {
		setLoading: (store, action) => {
			store.isLoading = action.payload
		},
		setShowEditModal: (store, action) => {
			store.showEditModal = action.payload
		},
		setShowDeleteModal: (store, action) => {
			store.showDeleteModal = action.payload
		},
		setShowAddExerciseModal: (store, action) => {
			store.showAddExerciseModal = action.payload
		},
		setShowUpdateProgramModal: (store, action) => {
			store.showUpdateProgramModal = action.payload
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
