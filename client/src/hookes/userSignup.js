import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { message } from "antd";
const API_URL = import.meta.env.VITE_API_BASE_URL

const userSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm)
      return setError("password are not matched");

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              "Content-Type": "application/json",
            },
        })
        
        const data = await res.json();
        
      if (res.status == 201) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (data.status == 400) {
        setError(data.message);
      } else {
        message.error("Registration Failed");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};

export default userSignup;
