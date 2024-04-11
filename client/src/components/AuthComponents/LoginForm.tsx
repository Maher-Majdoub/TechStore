import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";
import { TextField } from "@mui/material";
import styles from "./styles.module.css";
import useLogin from "../../hooks/useLogin";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAccountEndPoints } from "../../constants";
import { NextPageContext } from "../../contexts";

interface FormInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const { login, isLoginSuccess, isLoginPending } = useLogin();

  const navigate = useNavigate();

  const { nextPage } = useContext(NextPageContext);

  useEffect(() => {
    isLoginSuccess &&
      navigate(nextPage || userAccountEndPoints["account_dashboard"]);
  }, [isLoginSuccess]);

  const onLogin: SubmitHandler<FormInput> = (data) => {
    login(data);
  };

  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>Registered Customers</h5>
      <span className={styles.desc}>
        If you have an account, sign in with your credentials.
      </span>
      <form onSubmit={handleSubmit(onLogin)} className={styles.form}>
        <TextField
          {...register("username", { required: "Username is required" })}
          label="Username"
          type="text"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <div className={styles.btnContainer}>
          <Button load={isLoginPending} filled>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
