import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network resp');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching :', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: {
        name: formData.company
      }
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
     
      
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Success:', data);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: ''
      });
      alert('User registered successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error user. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>    
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          placeholder='Name' 
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder='Email' 
          required 
        />
        <input 
          type="text" 
          name="phone" 
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone' 
          required 
        />
        <input 
          type="text" 
          name="company" 
          value={formData.company}
          onChange={handleChange}
          placeholder='Company' 
          required 
        />
        <button type="submit">Register</button>
      </form>

      <div className="users-list">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


