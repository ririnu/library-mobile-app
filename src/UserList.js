import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter(user => user.id !== id));
        alert("User deleted successfully!");
      } catch(err) {
        console.error(err);
        alert("Error deleting user");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => u.id === editingUser.id ? {...u, name, email, phone} : u));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch(err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {editingUser && (
        <div className="card p-3 mb-4 bg-light">
          <h4>Edit User</h4>
          <form onSubmit={handleUpdate}>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="form-control mb-2" placeholder="Name" />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control mb-2" placeholder="Phone" />
            <button type="submit" className="btn btn-success me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}

      <input 
        type="text" 
        placeholder="Search by name" 
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Name ↕️</th>
            <th onClick={() => sortBy("email")}>Email ↕️</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={()=>handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
