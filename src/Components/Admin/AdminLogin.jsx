import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";

function AdminLogin() {
  const [Message, SetMessage] = useState(false);

  const Email = useRef("");
  const Password = useRef("");

  const Navigate = useNavigate();
  const { logIn } = useUserAuth();
  const [error, setError] = useState("");
  const LoginUser = async (event) => {
    event.preventDefault();
    setError("");
    SetMessage(true);
    setError("");
    try {
      await logIn(Email.current.value, Password.current.value);
      Navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="h-screen w-[98%]">
        <div className="w-[25%] translate-y-[15vw] bg-white rounded shadow-lg mx-auto p-6 px-7">
          {error && <div className="my-1">{error}</div>}
          <h1 className="text-center text-3xl mb-5">Log-In</h1>
          <form onSubmit={LoginUser}>
            <div className="space-y-8 mx-auto">
              <input
                type="Email"
                name="email"
                id="email"
                placeholder="Email"
                ref={Email}
                className="py-2 w-[98%] px-4 rounded-lg mx-2 bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
              ></input>

              <input
                type="Password"
                name="password"
                id="password"
                placeholder="Password"
                ref={Password}
                className="py-2 w-[98%] px-4 rounded-lg mx-2 bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
              ></input>
              <button type="submit" className="a-btn-primary translate-x-[8vw]">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
