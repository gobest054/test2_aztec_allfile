import React, { useState, useEffect } from 'react';
import { getData } from './api';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [newItem, setNewItem] = useState({ INSCL: '', SUBINSCL: '', Rights_Name: '', HOSxP_Rights: '', PTTYPE: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const itemWithIntPTTYPE = { ...newItem, PTTYPE: parseInt(newItem.PTTYPE) };
    try {
      const response = await axios.post('http://localhost:8000/api/data', itemWithIntPTTYPE);
      setData([...data, response.data]); 
      setNewItem({ INSCL: '', SUBINSCL: '', Rights_Name: '', HOSxP_Rights: '', PTTYPE: '' }); 
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const editItemWithIntPTTYPE = { ...editItem, PTTYPE: parseInt(editItem.PTTYPE) };
    try {
      const response = await axios.put(`http://localhost:8000/api/data/${editItem.id}`, editItemWithIntPTTYPE);
      const updatedData = data.map(item => item.id === editItem.id ? response.data : item);
      setData(updatedData);
      setEditItem(null); 
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem({ ...editItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Data List</h1>

       
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded mb-4"
        />

        
        <h2 className="text-2xl font-semibold mb-4">Add New Data</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            name="INSCL"
            value={newItem.INSCL}
            onChange={handleChange}
            placeholder="INSCL"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="SUBINSCL"
            value={newItem.SUBINSCL}
            onChange={handleChange}
            placeholder="SUBINSCL"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="Rights_Name"
            value={newItem.Rights_Name}
            onChange={handleChange}
            placeholder="Rights Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="HOSxP_Rights"
            value={newItem.HOSxP_Rights}
            onChange={handleChange}
            placeholder="HOSxP Rights"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="PTTYPE"
            value={newItem.PTTYPE}
            onChange={handleChange}
            placeholder="PTTYPE"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        
        {editItem && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Edit Data</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                name="INSCL"
                value={editItem.INSCL}
                onChange={handleChange}
                placeholder="INSCL"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="SUBINSCL"
                value={editItem.SUBINSCL}
                onChange={handleChange}
                placeholder="SUBINSCL"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="Rights_Name"
                value={editItem.Rights_Name}
                onChange={handleChange}
                placeholder="Rights Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="HOSxP_Rights"
                value={editItem.HOSxP_Rights}
                onChange={handleChange}
                placeholder="HOSxP Rights"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="PTTYPE"
                value={editItem.PTTYPE}
                onChange={handleChange}
                placeholder="PTTYPE"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
            </form>
          </>
        )}

        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Data List</h2>
        {filteredData && filteredData.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">INSCL</th>
                <th className="p-2 text-left">SUBINSCL</th>
                <th className="p-2 text-left">hmain</th>
                <th className="p-2 text-left">hsub</th>
                <th className="p-2 text-left">Rights_Name</th>
                <th className="p-2 text-left">HOSxP_Rights</th>
                <th className="p-2 text-left">PTTYPE</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.INSCL}</td>
                  <td className="p-2">{item.SUBINSCL}</td>
                  <td className="p-2">{item.hmain}</td>
                  <td className="p-2">{item.hsub}</td>
                  <td className="p-2">{item.Rights_Name}</td>
                  <td className="p-2">{item.HOSxP_Rights}</td>
                  <td className="p-2">{item.PTTYPE}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}

export default App;
