import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //   if (data.password === data.password2) {
    //   await createUser(data.email, data.password)
    //     .then((userCredential) => {
    //       setUser(userCredential.user);
    //       saveUsers(userCredential.user);
    //       navigate(url);
    //       setIsLoading(true);
    //     })
    //     .catch((error) => {
    //       warning(false);
    //     })
    //     .finally(() => setIsLoading(false));
    // } else {
    //   warning(false);
    // }
  };
  return (
    <div className=" my-5    ">
      <h4 className="text-center">
        Welcome Power Hack Plant! <br />
        <spn className="text-primary"> Register Please!</spn>
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
          <input
            className="mt-1 w-25"
            {...register("password2")}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <br />
          <input className="mt-1 w-25" type="submit" />
        </form>
      </div>
      {/* <p className="text-center mt-3">
        If you have account? <Link to="/">Login</Link>
      </p> */}
    </div>
  );
};

export default Register;
