import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (er) {
      console.log(er);
    }

    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) return "Email must include @";
                return true;
              },
            })}
            type="text"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        {errors.email && (
          <div className="alert alert-danger"> {errors.email.message}</div>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be 8 characters" },
            })}
            id="password"
            name="password"
            type="text"
            className="form-control"
          />
          {errors.password && (
            <div className="alert alert-danger"> {errors.password.message}</div>
          )}
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "Loading .. " : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
