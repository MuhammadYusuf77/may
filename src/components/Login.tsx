import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { API, setAuthData } from "../utils/config";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    key: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      key: form.key,
      secret: "mySecret",
    };

    const res = await API.post("/signin", data);
    console.log("Login response:", res.data);

    const { key, secret } = res.data;
    setAuthData(key, secret);
    localStorage.setItem("user", "true");
    navigate("/private");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="key"
        placeholder="Password"
        value={form.key}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
