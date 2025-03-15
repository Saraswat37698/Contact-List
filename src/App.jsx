import { useState, useEffect } from "react";
import "./App.css";
import cont from "./assets/cont.png";
import sidebarmessage from "./assets/sidebarmessage.png";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [arr, setarr] = useState("");
  const [S, setS] = useState("");
  const [M, setM] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [Person, setPerson] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPerson(contactsArray);
    }
    fetchContacts();
  }, []);

  async function AddContact() {
    if (arr && M && S) {
      const newContact = { profile: cont, name: arr, surname: S, mobile: M };
      const docRef = await addDoc(collection(db, "contacts"), newContact);
      setPerson([...Person, { id: docRef.id, ...newContact }]);
      setarr("");
      setM("");
      setS("");
    }
  }

  async function deleteContact(id) {
    await deleteDoc(doc(db, "contacts", id));
    setPerson(Person.filter(person => person.id !== id));
  }

  const filteredContacts = Person.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.surname && person.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (person.mobile && person.mobile.includes(searchTerm))
  );

  return (
    <>
      <div className="container">
        <div className="show">
          <div id="name">
            <img style={{ height: "40px" }} src={cont} alt="Contact Icon" />
            <h3 style={{ padding: "3px", fontWeight: "normal", fontSize: "16px", color: "#8d998c" }}>John Wan</h3>
          </div>
          <div id="search">
            <input
              type="search"
              placeholder="search"
              style={{ padding: "3px", height: "35px", width: "330px", border: "none" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={{ padding: "3px", height: "35px", width: "85px", borderRadius: "4px", border: "none", backgroundColor: "#dce4db" }}>Search</button>
          </div>
        </div>

        <div className="belowshow">
          <div className="sidebar">
            <div className="inner2">
              <h3>{Person.length}<span> </span>Contacts</h3>
              <h3>Favourites</h3>
            </div>

            <div className="inner3">
              <img src={sidebarmessage} alt="Sidebar Message Icon" />
            </div>

            <div className="inner1">
              <div id="inner1">
                <input style={{ width: "100px", marginLeft: "5px" }} type="text" placeholder="Name" className="name" value={arr} onChange={(e) => setarr(e.target.value)} />
                <input style={{ width: "100px", marginLeft: "5px" }} type="text" placeholder="Surname" className="surname" value={S} onChange={(e) => setS(e.target.value)} />
              </div>
              <div id="inner2">
                <input type="text" placeholder="Mobile" className="phone" value={M} onChange={(e) => setM(e.target.value)} />
                <button id="Add" onClick={AddContact}>Add</button>
              </div>
            </div>
          </div>

          <div className="listing">
            <div className="besidesidebar">
              <div id="insideside">
                <div id="list">
                  <p>Profile</p>
                  <p>Name</p>
                  <p>Surname</p>
                  <p>Mobile</p>
                  <p>Action</p>
                </div>
              </div>
            </div>

            {filteredContacts.length > 0 ? 
            (
              filteredContacts.map((person, index) => (
                <div style={{ backgroundColor: "white", color: "black" }} key={person.id} className="besidesidebar">
                  <div style={{ backgroundColor: "white", color: "black" }} id="insideside">
                    <div id="list">
                      <img src={person.profile} alt="Profile" style={{ height: "38px", borderRadius: "50%", position: "relative", top: "8px" }} />
                      <p>{person.name}</p>
                      <p>{person.surname}</p>
                      <p>{person.mobile}</p>
                      <button style={{ height: "30px", marginTop: "15px", borderRadius: "10px", border: "none", backgroundColor: "#685fba", color: "white" }} onClick={() => deleteContact(person.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "gray", position: "relative", top: "110px", right: "100px", fontSize: "30px" }}>No contacts found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
