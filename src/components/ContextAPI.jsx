import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext(null);

export default function ContextAPI({ children }) {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const initialState = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      address: {
        city: "",
      },
      company: {
        name: "",
      },
    }),
    []
  );

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  //  fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users");
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  //  add a new user
  const handleAddUser = useCallback(async () => {
    if (!formData.name && !formData.email) {
      setError("Both fields are required");
      return;
    }
    if (!formData.email) {
      setError("Email fields are required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid");
    }
    try {
      const response = await axios.post(API_URL, formData);
      setUsers((prev) => [...prev, response.data]);
      setFormData(initialState);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to add user");
    }
  }, [API_URL, formData, initialState]);

  //  edit existing user
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

  //  save user details
  const handleSaveEdit = useCallback(
    async (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      if (!formData.name || !formData.email) {
        setError("Both fields are required");
        return;
      }
      if (!formData.email) {
      setError("Email fields are required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid");
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
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to edit user");
      }
    },
    [API_URL, editUser, formData, initialState, navigate]
  );

  //  delete a user
  const handleDeleteUser = useCallback(
    async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.log(error);
        setError("Failed to delete a user");
      }
    },
    [API_URL]
  );

  return (
    <userContext.Provider
      value={{
        users,
        error,
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
