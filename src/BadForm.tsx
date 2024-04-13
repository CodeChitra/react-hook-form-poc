import { FormEvent, useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError((prevError) => ({
        ...prevError,
        email: "Email should include @!",
      }));
      return;
    }

    if (password.length < 8) {
      setError((prevError) => ({
        ...prevError,
        password: "Password should contain atleast 8 characters!",
      }));
      return;
    }
    console.log("Form Submitted!");
    setError({ email: "", password: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <span>{error.email}</span>}
      </div>
      <div className="input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <span>{error.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
