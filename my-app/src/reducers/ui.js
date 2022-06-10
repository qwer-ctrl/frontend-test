import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
	name: 'ui',
	initialState: {
		isLoading: false,
		showModal: false,
		currentModalId: null,
	},
	reducers: {
		setLoading: (store, action) => {
			store.isLoading = action.payload
		},
		setShowModal: (store, action) => {
			store.showModal = action.payload
		},
		setCurrentModalId: (store, action) => {
			store.currentModalId = action.payload
		},
	},
})

export default ui
