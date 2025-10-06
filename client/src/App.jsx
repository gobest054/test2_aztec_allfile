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
    // กรองข้อมูลตามคำค้นหา
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // อัปเดตคำค้นหาที่ผู้ใช้พิมพ์
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const itemWithIntPTTYPE = { ...newItem, PTTYPE: parseInt(newItem.PTTYPE) };
    try {
      const response = await axios.post('http://localhost:8000/api/data', itemWithIntPTTYPE);
      setData([...data, response.data]); // เพิ่มข้อมูลที่เพิ่มใหม่เข้าในตาราง
      setNewItem({ INSCL: '', SUBINSCL: '', Rights_Name: '', HOSxP_Rights: '', PTTYPE: '' }); // รีเซ็ตฟอร์ม
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const editItemWithIntPTTYPE = { ...editItem, PTTYPE: parseInt(editItem.PTTYPE) };
    try {
      const response = await axios.put(`http://localhost:8000/api/data/${editItem.id}`, editItemWithIntPTTYPE );
      const updatedData = data.map(item => item.id === editItem.id ? response.data : item);
      setData(updatedData);
      setEditItem(null); // รีเซ็ตการแก้ไข
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
    <div>
      <h1>Data List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <h2>Add New Data</h2>
      <form onSubmit={handleAdd}>
        <input type="text" name="INSCL" value={newItem.INSCL} onChange={handleChange} placeholder="INSCL" />
        <input type="text" name="SUBINSCL" value={newItem.SUBINSCL} onChange={handleChange} placeholder="SUBINSCL" />
        <input type="text" name="Rights_Name" value={newItem.Rights_Name} onChange={handleChange} placeholder="Rights Name" />
        <input type="text" name="HOSxP_Rights" value={newItem.HOSxP_Rights} onChange={handleChange} placeholder="HOSxP Rights" />
        <input type="text" name="PTTYPE" value={newItem.PTTYPE} onChange={handleChange} placeholder="PTTYPE" />
        <button type="submit">Add</button>
      </form>

      {editItem && (
        <>
          <h2>Edit Data</h2>
          <form onSubmit={handleEdit}>
            <input type="text" name="INSCL" value={editItem.INSCL} onChange={handleChange} placeholder="INSCL" />
            <input type="text" name="SUBINSCL" value={editItem.SUBINSCL} onChange={handleChange} placeholder="SUBINSCL" />
            <input type="text" name="Rights_Name" value={editItem.Rights_Name} onChange={handleChange} placeholder="Rights Name" />
            <input type="text" name="HOSxP_Rights" value={editItem.HOSxP_Rights} onChange={handleChange} placeholder="HOSxP Rights" />
            <input type="text" name="PTTYPE" value={editItem.PTTYPE} onChange={handleChange} placeholder="PTTYPE" />
            <button type="submit">Update</button>
          </form>
        </>
      )}

      <h1>Data List</h1>
      {filteredData && filteredData.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>INSCL</th>
              <th>SUBINSCL</th>
              <th>hmain</th>
              <th>hsub</th>
              <th>Rights_Name</th>
              <th>HOSxP_Rights</th>
              <th>PTTYPE</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.INSCL}</td>
                <td>{item.SUBINSCL}</td>
                <td>{item.hmain}</td>
                <td>{item.hsub}</td>
                <td>{item.Rights_Name}</td>
                <td>{item.HOSxP_Rights}</td>
                <td>{item.PTTYPE}</td>
                <td>
                  <button onClick={() => setEditItem(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
