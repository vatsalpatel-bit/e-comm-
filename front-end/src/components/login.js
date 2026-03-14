import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]); 

  const handlelogin = async () => {
    try {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      result = await result.json();
      console.warn(result);

      if (result.name) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/Add");
      } else {
        alert("Please enter correct details");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your connection and try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handlelogin();
        }}
      >
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
