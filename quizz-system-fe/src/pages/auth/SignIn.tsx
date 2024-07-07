import { FormEvent, useState } from "react";
import { useAppDispatch } from "@main/features/hooks";
import { signIn } from "@main/features/slices/authentication.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSignInClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(signIn({
      username,
      password
    }))
      .then(unwrapResult)
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form className="user" onSubmit={onSignInClick}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-user btn-block"
                    >
                      Login
                    </Button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/authentication/sign-up">Create an Account!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
