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
    <div className="App" style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        color: '#333',
        textAlign: 'center',
        marginBottom: '30px'
      }}>Register</h1>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '40px'
      }}>    
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          placeholder='Name' 
          required 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder='Email' 
          required 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <input 
          type="text" 
          name="phone" 
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone' 
          required 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <input 
          type="text" 
          name="company" 
          value={formData.company}
          onChange={handleChange}
          placeholder='Company' 
          required 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <button type="submit" style={{
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>Register</button>
      </form>

      <div className="users-list" style={{
        marginTop: '30px'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '20px'
        }}>Registered Users</h2>
        
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}>
          <thead>
            <tr>
              <th style={{
                backgroundColor: '#f8f9fa',
                padding: '12px',
                borderBottom: '2px solid #dee2e6',
                textAlign: 'left'
              }}>Name</th>
              <th style={{
                backgroundColor: '#f8f9fa',
                padding: '12px',
                borderBottom: '2px solid #dee2e6',
                textAlign: 'left'
              }}>Email</th>
              <th style={{
                backgroundColor: '#f8f9fa',
                padding: '12px',
                borderBottom: '2px solid #dee2e6',
                textAlign: 'left'
              }}>Phone</th>
              <th style={{
                backgroundColor: '#f8f9fa',
                padding: '12px',
                borderBottom: '2px solid #dee2e6',
                textAlign: 'left'
              }}>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #dee2e6'
                }}>{user.name}</td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #dee2e6'
                }}>{user.email}</td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #dee2e6'
                }}>{user.phone}</td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #dee2e6'
                }}>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


