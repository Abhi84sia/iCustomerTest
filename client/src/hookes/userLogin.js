import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { message } from "antd";
const API_URL = import.meta.env.VITE_API_BASE_URL



const userLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const loginuser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 401) {
        setError(data.message);
      } else {
        message.error("Registration Failed");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginuser };
};

export default userLogin;
