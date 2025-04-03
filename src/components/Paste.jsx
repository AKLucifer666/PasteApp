import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePaste } from '../redux/pasteSlice';
import "./Paste.css";

const OnePaste = ({ title, content, onCancel, id }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className="card-buttons">
        <div className="button edit"> <a href={`/?pasteId=${id}`}>Update</a></div>
          <button className="button cancel" onClick={onCancel}>X</button>
        </div>
      </div>
      <div className="card-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");

  const handleCancel = (id) => {
    dispatch(removePaste(id));
  };


    const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
    // console.log(filterData);

  // const cards = [
  //   { id: 1, title: "Card 1", content: "This is the first few lines of content for card 1..." },
  //   { id: 2, title: "Card 2", content: "This is the first few lines of content for card 2..." },
  //   { id: 3, title: "Card 3", content: "This is the first few lines of content for card 3..." },
  // ];

  return (
    <div>
      <input className = "search" type="text" placeholder='Search Paste' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <div className="card-list">
        {filterData.map(paste => (
          <OnePaste
            key={paste._id}
            id={paste._id}
            title={paste.title}
            content={paste.content}
            onCancel={() => handleCancel(paste._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Paste;
