import React, { useState, useEffect } from 'react';
import { getData } from './api';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <div>
      <h1>Data List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

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
