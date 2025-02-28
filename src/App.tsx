import { BoxDiv, CustomSnackbar, StyledDiv } from "./App.styled.tsx";
import { useForm } from "react-hook-form";
import Snackbar from "./Snackbar.tsx";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import * as React from "react";
import { useSnackbar } from "@mui/base/useSnackbar";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const registerForm = useForm();
  const loginForm = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmitRegister = async (data) => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 200) {
      setSnackbarMessage(`User ${data.nickname} registered.`);
    } else {
      setSnackbarMessage(`Error registering user.`);
    }
    handleOpen();
  };

  const handleSubmitLogin = async (data) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      setSnackbarMessage(`User ${responseJson.user.nickname} logged in.`);
    } else {
      setSnackbarMessage(`Error logging in.`);
    }
    handleOpen();
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
    });
    const responseJson = await response;
    if (response.status === 200) {
      setSnackbarMessage(`User logged out.`);
    } else {
      setSnackbarMessage(`Error logging out.`);
    }
    handleOpen();
  };

  return (
    <>
      <StyledDiv>
        <BoxDiv>
          <h2>create user</h2>
          <form onSubmit={registerForm.handleSubmit(handleSubmitRegister)}>
            <div>
              <label>Nickname:</label>
              <input
                {...registerForm.register("nickname", { required: true })}
                autoComplete="username"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                {...registerForm.register("email", { required: true })}
                autoComplete="email"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                {...registerForm.register("password", { required: true })}
                autoComplete="new-password"
              />
            </div>
            <button type="submit">Create user</button>
          </form>
        </BoxDiv>
        <BoxDiv>
          <h2>login user</h2>
          <form onSubmit={loginForm.handleSubmit(handleSubmitLogin)}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                {...loginForm.register("email", { required: true })}
                autoComplete="email"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                {...loginForm.register("password", { required: true })}
                autoComplete="password"
              />
            </div>
            <button type="submit">Login user</button>
          </form>
          <button onClick={handleLogout}>Logout user</button>
        </BoxDiv>
      </StyledDiv>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>{snackbarMessage}</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </>
  );
}

export default App;
