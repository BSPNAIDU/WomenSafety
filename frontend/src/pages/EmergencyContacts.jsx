import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EmergencyContacts() {
  const [name, setName] = useState("");
  const [relation, setRelation] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [priority, setPriority] =
    useState(false);

  const [contacts, setContacts] =
    useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/api/contacts"
        );

      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async () => {
    if (
      !name ||
      !relation ||
      !phone
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/contacts",
        {
          name,
          relation,
          phone,
          priority,
        }
      );

      setName("");
      setRelation("");
      setPhone("");
      setPriority(false);

      fetchContacts();

      alert(
        "Contact Added Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (
    id
  ) => {
    try {
      await axios.delete(
        `https://saferoute-backend-zxrv.onrender.com/api/contacts${id}`
      );

      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <Link to="/dashboard">
        <button
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </Link>

      <h1
        style={{
          color: "white",
          fontSize: "40px",
        }}
      >
        👥 Emergency Contacts
      </h1>

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "25px auto",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          ➕ Add Emergency Contact
        </h2>

        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Relationship"
          value={relation}
          onChange={(e) =>
            setRelation(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
          }}
        />

        <label>
          <input
            type="checkbox"
            checked={priority}
            onChange={(e) =>
              setPriority(
                e.target.checked
              )
            }
          />

          ⭐ Priority Contact
        </label>

        <br />
        <br />

        <button
          onClick={addContact}
          style={{
            background:
              "linear-gradient(90deg,#22c55e,#16a34a)",
            color: "white",
            border: "none",
            padding:
              "12px 25px",
            borderRadius:
              "10px",
            cursor: "pointer",
          }}
        >
          Save Contact
        </button>
      </div>

      <h2
        style={{
          color: "white",
        }}
      >
        Saved Contacts
      </h2>
            {contacts.length === 0 ? (
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "500px",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h3>
            No Contacts Available
          </h3>
        </div>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact._id}
            style={{
              backgroundColor: "white",
              maxWidth: "500px",
              margin: "20px auto",
              padding: "20px",
              borderRadius: "20px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h2>
              {contact.priority &&
                "⭐ "}
              {contact.name}
            </h2>

            <p>
              <strong>
                Relation:
              </strong>{" "}
              {contact.relation}
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {contact.phone}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              <a
                href={`tel:${contact.phone}`}
              >
                <button
                  style={{
                    backgroundColor:
                      "#16a34a",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 20px",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer",
                  }}
                >
                  📞 Call
                </button>
              </a>

              <button
                onClick={() =>
                  deleteContact(
                    contact._id
                  )
                }
                style={{
                  backgroundColor:
                    "#dc2626",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "10px 20px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div
        style={{
          backgroundColor: "white",
          maxWidth: "500px",
          margin: "25px auto",
          padding: "20px",
          borderRadius: "20px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2>
          🛡 Safety Tip
        </h2>

        <p>
          Always keep at least one
          priority contact for SOS
          alerts and emergency
          situations.
        </p>
      </div>
    </div>
  );
}

export default EmergencyContacts;