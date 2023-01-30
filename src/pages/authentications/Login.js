import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className=" my-5    ">
      <h4 className="text-center">
        Welcome Power Hack Plant! <br />
        <spn className="text-primary"> Login Please!</spn>
      </h4>
      <div className="w-100 text-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="mt-1 w-25"
            {...register("email")}
            placeholder="Email"
            type="email"
            required
          />
          <br />
          <input
            className="mt-1 w-25"
            {...register("password")}
            placeholder="Password"
            type="password"
            required
          />
          <br />
          <input className="mt-1 w-25" type="submit" />
        </form>
      </div>
      <p className="text-center mt-3">
        If you a new user? <Link to="register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
