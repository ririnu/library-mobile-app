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
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="form-control mb-2"/>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="form-control mb-2"/>
        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" className="form-control mb-2"/>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
export default Registration;