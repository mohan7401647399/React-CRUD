/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userContext = createContext(null);

export default function ContextAPI({ children }) {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
    },
    company: {
      name: "",
    },
  };

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Form validation logic
  const validateForm = () => {
    if (!formData.name || !formData.email) {
      toast.error("Both name and email are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  // Add new user
  const handleAddUser = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(API_URL, formData);
      setUsers((prev) => [...prev, response.data]);
      setFormData(initialState);
      toast.success("User added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    }
  }, [API_URL, formData]);

  // Edit existing user
  const handleEditUser = useCallback((user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      company: user.company,
    });
  }, []);

  // Save user details
  const handleSaveEdit = useCallback(async () => {
    if (!validateForm()) return;
    if (!editUser?.id) {
      toast.error("Invalid user");
      return;
    }

    try {
      const response = await axios.patch(`${API_URL}/${editUser.id}`, formData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editUser.id ? { ...user, ...response.data } : user
        )
      );
      setEditUser(null);
      setFormData(initialState);
      navigate("/");
      toast.success("User details updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit user");
    }
  }, [API_URL, editUser, formData, initialState, navigate]);

  // Delete user
  const handleDeleteUser = useCallback(
    async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete user");
      }
    },
    [API_URL]
  );

  return (
    <userContext.Provider
      value={{
        users,
        formData,
        handleAddUser,
        setFormData,
        handleEditUser,
        handleDeleteUser,
        handleSaveEdit,
        editUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
