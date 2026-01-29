import { useEffect, useState } from "react";

function App() {
  const [properties, setProperties] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  const addProperty = async () => {
    await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, location, price })
    });
    window.location.reload();
  };

  const deleteProperty = async (id) => {
    await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: "DELETE"
    });
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real Estate CRM</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Location" onChange={e => setLocation(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <button onClick={addProperty}>Add Property</button>

      <ul>
        {properties.map(p => (
          <li key={p._id}>
            {p.title} - {p.location} - ₹{p.price}
            <button onClick={() => deleteProperty(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
