import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { login } from "../services/authService";

const Login = () => {
  const [error, setError] = useState(null);

  const { setUser, setToken } = useStateContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const { data } = await login(payload);
      setUser(data.user);

      setToken(data.token);

      console.log(response);
    } catch (error) {
      const { response } = error;

      if (response) {
        setError(response.data);
      }
    }
  };

  return (
    <div className="py-4 px-6 bg-white shadow rounded-md flex flex-col">
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl text-center mb-3 font-bold">Login</h1>

        {error && (
          <p className="py-2 px-3 text-center w-[100%] bg-red-500 mb-4 text-white">
            {error}
          </p>
        )}

        <div className="w-[100%] mb-2">
          <label>Email</label>
          <input
            className="w-full border my-2 py-2 px-3 rounded-md"
            name="Email"
            type="email"
            ref={emailRef}
            placeholder="E.g josh@admin.com"
          />
        </div>

        <div className="w-[100%] mb-2">
          <label>Password</label>
          <input
            className="w-full border my-2 py-2 px-3 rounded-md"
            name="Password"
            type="password"
            ref={passwordRef}
            placeholder="password"
          />
        </div>

        <button className="bg-primary text-white py-2 px-4 w-[100%] mt-2 font-semibold">
          Go!
        </button>
      </form>

      <div className="mt-3">
        <p className="text-sm mt-2 text-center text-gray-600">
          Dont have an account,{" "}
          <Link className="underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
