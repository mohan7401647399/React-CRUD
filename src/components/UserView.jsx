import React, { useContext } from "react";
import { userContext } from "./ContextAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserView = () => {
  const {
    formData,
    setFormData,
    editUser,
    error,
    handleAddUser,
    handleSaveEdit,
  } = useContext(userContext);

  const handleSubmit = () => {
    if (editUser) {
      handleSaveEdit();
      toast.success("User details updated successfully!"); // Success toast
    } else {
      handleAddUser();
      toast.success("User added successfully!"); // Success toast
    }
  };

  return (
    <div className="justify-center bg-black h-screen text-white m-auto p-5">
      <h1 className="font-extrabold text-2xl text-center text-pink-400 m-auto p-3">
        User Details
      </h1>
      <div className="border-2 rounded-lg p-2 w-96 m-auto text-center">
        <h2 className="font-medium">{editUser ? "Edit User" : "Add User"}</h2>
        <div className="p-1 m-1">
          <label>Name: </label>
          <input
            className="text-black p-1 m-1 rounded-md"
            type="text"
            name="name"
            required
            placeholder="xxxxxx"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            className="text-black p-1 m-1 rounded-md"
            type="email"
            name="email"
            required
            placeholder="xxxx@xxx.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            className="text-black p-1 m-1 rounded-md"
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
        <div>
          <label>City: </label>
          <input
            className="text-black p-1 m-1 rounded-md"
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Company Name: </label>
          <input
            className="text-black p-1 m-1 rounded-md"
            type="text"
            name="company"
            required
            value={formData.company.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 p-2 rounded m-2" onClick={handleSubmit}>
          {editUser ? "Save Changes" : "Add User"}
        </button>
        <button className="bg-blue-500 p-2 rounded m-2">
          <Link to="/">Go to HomePage</Link>
        </button>
      </div>
    </div>
  );
};

export default UserView;
