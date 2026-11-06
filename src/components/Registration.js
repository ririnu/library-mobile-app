import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name.length < 3){ alert("Name must be at least 3 characters"); return; }
    if(!email.includes("@")){ alert("Invalid email"); return; }
    if(phone.length !== 10){ alert("Phone must be 10 digits"); return; }

    try {
      await addDoc(collection(db, "users"), {
        name: name, email: email, phone: phone, timestamp: new Date()
      });
      alert("Registration successful!");
      setName(""); setEmail(""); setPhone("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mx-auto" style={{maxWidth: "500px"}}>
        <h2 className="text-center mb-3">Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" className="form-control mb-3"/>
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="form-control mb-3"/>
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter 10 digit Phone" className="form-control mb-3"/>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Registration;