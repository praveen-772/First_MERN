import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listofUsers, setlistofUsers] = useState([]);
  const [name, setName] = useState("");
  const [mob, setMob] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [DeleteUser, setDeleteUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getUsers").then((response) => {
      setlistofUsers(response.data);
    });
  }, [listofUsers]);

  const createUser = () => {
    console.log(name);
    console.log(mob);
    console.log(email);
    console.log(address);
    axios
      .post("http://localhost:5000/createUser", { name, mob, email, address })
      .then((response) => {
        setlistofUsers([...listofUsers, { name, mob, email, address }]);
        
        console.log("Details send to Server");
      });
  };

  const deleteUser = () => {
    axios
      .post("http://localhost:5000/deleteUser", { DeleteUser })
      .then((response) => {
        console.log("Contact "+DeleteUser+"Deleted Successfully");
      });
  };

  return (
    <div className="App">
      <div className="usersDisplay">
        <h1 className="heading">
          <u> Contact List </u>
        </h1>

        <div>
          <table className="contact-table">
            <tr>
              <th>Name</th>
              <th>Contact No</th>
              <th>Email Id</th>
              <th>Address</th>
            </tr>
            {listofUsers.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.mob}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <div className="createUser">
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="number"
          placeholder="Contact No..."
          onChange={(e) => {
            setMob(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Address..."
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button onClick={createUser}>Create Contact</button>
      </div>
      <div className="deleteUser">
        <input
          type="text"
          placeholder="Enter Name to delete"
          onChange={(e) => {
            setDeleteUser(e.target.value);
          }}
        />
        <button onClick={deleteUser}>Delete Contact</button>
      </div>
    </div>
  );
}

export default App;
