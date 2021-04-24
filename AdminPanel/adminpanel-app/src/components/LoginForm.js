import React, { useState } from "react";
//import logotrash from 'C:/Users/yurab/OneDrive/Desktop/Diploma/AdminPanel/adminpanel-app/src/img/logotrash.svg';

function LoginForm() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  const Login = (details) => {
    console.log(details);

    fetch("https://localhost:44367/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (JSON.stringify(result.token));
          if (result === false) {
            alert("Авторизаци не прошла");
          } else {
            localStorage.setItem("token", JSON.stringify(result.token));
            localStorage.setItem("id_users", JSON.stringify(result.guid));
            check();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function check() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      console.log("Logged in");
      setUser({
        email: details.email,
        password: details.password,
      });
      window.location.reload();
    } else {
      console.log("Details do not math!");
      setError("Details do not math!");
    }
    //debugger;
  }

  return (
    <div className="text-center mt-5">
      <form
        onSubmit={submitHandler}
        style={{ maxWidth: "300px", margin: "auto" }}
      >
        <div className="form-inner">
          <img
            //src={logotrash}
            className="mt-4 mb-4"
            alt="logotrash"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <div className="form-group">
            <p className="text-primary">Cherk In</p>
          </div>
          <input
            className="btn btn-lg btn-primary"
            type="submit"
            value="LOGIN"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
