import React, { useState, useEffect } from 'react';
import { getData } from './api'; 

function App() {
  const [data, setData] = useState([]);  

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

 
  return (
     <div>
      <h1>Data List</h1>
      {data && data.length > 0 ? (
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
            {data.map((item) => (
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
