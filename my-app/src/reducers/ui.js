import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
	name: 'ui',
	initialState: {
		isLoading: false,
	},
	reducers: {
		setLoading: (store, action) => {
			store.isLoading = action.payload
		},
	},
})

export default ui