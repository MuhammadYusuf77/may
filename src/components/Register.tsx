import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { API, setAuthData } from "../utils/config";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    key: "",
    confirm: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: form.name,
      email: `${form.name}@gmail.com`,
      key: form.key,
      secret: "mySecret",
    };
    const res = await API.post("/signup", data);
    console.log("Register response:", res.data);

    const { key, secret } = res.data;

    setAuthData(key, secret);
    localStorage.setItem("user", "true");
    navigate("/private");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="password"
        name="key"
        placeholder="Password"
        value={form.key}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        value={form.confirm}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}
