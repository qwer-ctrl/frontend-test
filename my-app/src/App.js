import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Login from './pages/Login'
import MyPage from './pages/MyPage'
import SingleProgram from './pages/SingleProgram'
import NotFound from './pages/NotFound'

import user from './reducers/user'
import {program} from './reducers/program'
import exercise from './reducers/exercise'
import ui from './reducers/ui'

const reducer = combineReducers({
  user: user.reducer,
  program: program.reducer,
  exercise: exercise.reducer,
  ui: ui.reducer
})


const persistedStateJSON = localStorage.getItem("userItemsReduxState")
let preloadedState = {}

if (persistedStateJSON) {
  preloadedState = JSON.parse(persistedStateJSON)
}

const store = configureStore({reducer, preloadedState})

store.subscribe(() => {
  localStorage.setItem("userItemsReduxState", JSON.stringify(store.getState()))
})


export const App = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/myprogram" element={<SingleProgram />}></Route>
          <Route path="/" element={<MyPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
