import React, { useState } from 'react';
import './App.css';

function App() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (form.title.trim() === '' || form.description.trim() === '') {
      alert("Both fields are required.");
      return;
    }

    if (isEditing) {
      const updatedTopics = topics.map((topic, index) =>
        index === currentIndex ? form : topic
      );
      setTopics(updatedTopics);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTopics([...topics, form]);
    }
    setForm({ title: '', description: '' });
    setIsFormVisible(false);  
  };

  const handleEdit = (index) => {
    setForm(topics[index]);
    setIsEditing(true);
    setCurrentIndex(index);
    setIsFormVisible(true);  
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic?");
    if (confirmDelete) {
      const updatedTopics = topics.filter((_, i) => i !== index);
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <span className='heading'>TODO LIST</span>
        <button className='btn' onClick={() => { 
          setIsFormVisible(true); 
          setIsEditing(false);
          setForm({ title: '', description: '' });  
        }}>Add Topic</button>
      </header>
      {isFormVisible && ( 
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Topic Title"
            value={form.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Topic Description"
            value={form.description}
            onChange={handleInputChange}
          />
          <button className='btn' type="submit">{isEditing ? 'Update Topic' : 'Add Topic'}</button>
        </form>
      )}
      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <button className='btn' onClick={() => handleEdit(index)}>Edit</button>
            <button className='btn' onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
