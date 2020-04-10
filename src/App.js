import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setProjects(response.data);
    });
}, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
          title: `New Repository ${Date.now()}`,
          url: "http://github.com/",
          techs: ["Node.JS", "ReactJS", "React Native"]
        });
    
    if (response.status === 200) {
      
      const repositorie = response.data;

      setProjects([...repositories, repositorie]);
      
    }    
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {
      
      const updatedRepo = repositories.filter(repositorie => repositorie.id !== id);

      setProjects(updatedRepo);  
    }    
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repositorie => 
        <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
