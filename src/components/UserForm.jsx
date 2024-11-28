import React, { useContext } from "react";
import { userContext } from "./ContextAPI";

const UserForm = () => {
  const {
    formData,
    error,
    setFormData,
    handleAddUser,
    editUser,
    handleSaveEdit,
  } = useContext(userContext);

  // Function to handle form submission and show a toast
  const handleSubmit = () => {
    if (editUser) {
      handleSaveEdit();
    } else {
      handleAddUser();
    }
  };

  return (
    <div className="text-center">
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
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button className="bg-blue-500 p-2 rounded m-2" onClick={handleSubmit}>
          {editUser ? "Save Changes" : "Add User"}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
