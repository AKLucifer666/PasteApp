import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPaste: (state,action) => {
        const paste = action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste created successfully!")
    },
    updatePaste: (state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);
        if(index>=0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste updated successfully!")
        }
    },
    resetPaste: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
        success("All Pastes Deleted!")
    },
    removePaste: (state,action) => {
        const id = action.payload;
        const index = state.pastes.findIndex((item) => item._id === id);
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted!");
    },
  },
})

export const { addPaste, updatePaste, resetPaste, removePaste } = pasteSlice.actions

export default pasteSlice.reducer