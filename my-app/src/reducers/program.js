import { createSlice } from "@reduxjs/toolkit"
// import user from "./user"
// import { API_URL } from "../utils/utils"

 export const program = createSlice({
    name: "program",
    initialState: {
        programType: null,
        programName: null,
        exercise: [],
        createdAt: null,
        programId: null,
        error: null
    },
    reducers: {
        setProgramType: (store, action) => {
            store.programType = action.payload
        },
        setProgramName: (store, action) => {
            store.programName = action.payload
        },
        setExercise: (store, action) => {
            store.exercise = action.payload
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
    }
})

// export const createProgram = ({programName, programType}) => {
//     return (dispatch, getState) => {
//         const userId = getState().user.userId
//         console.log("userId", userId)
//         fetch(API_URL(`program/${userId}`), {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({programName, programType})
//           })
//           .then(res => res.json())
//           .then(data => {
//               dispatch(program.actions.setProgramName(data))
//               dispatch(program.actions.setProgramType(data))
//               dispatch(program.actions.setProgramId(data))
//             console.log(data)
//           })
//           .catch((err) => {
//               console.log(err);
//           })
//           // .finally(() => {
//           //    dispatch(ui.actions.setLoading(false))
//           // })
//     }
// }


