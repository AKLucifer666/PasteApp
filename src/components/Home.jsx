import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useSearchParams} from "react-router-dom"
import { addPaste, updatePaste } from '../redux/pasteSlice'
import "./Home.css"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'

const Home = () => {
    const [title,setTitle] = useState("");
    const [value,setValue] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const pastes = useSelector((state) => state.paste.pastes);
    useEffect(() => {
        if(pasteId){
            let obj = pastes.find(item => item._id === pasteId);
            setTitle(obj.title);
            setValue(obj.content);
        }
    }, [pasteId])
    
    const dispatch = useDispatch();
    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
        if(pasteId){
            dispatch(updatePaste(paste));
        }
        else{
            dispatch(addPaste(paste));
        }
        setTitle("");
        setValue("");
        setSearchParams({});
    }
  return (
    <div>
        <input className='inp-title' type="text" placeholder='Enter title here' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <button onClick={createPaste}>
            {!pasteId ? "Create New Paste" : "Update Paste"}
        </button>
        <Toaster/>
        <div className='code-area'>
        <textarea placeholder='Enter Code here' value={value} id="" cols="80" rows="30" onChange={(e)=>setValue(e.target.value)}></textarea>
        </div>
    </div>
  )
}

export default Home