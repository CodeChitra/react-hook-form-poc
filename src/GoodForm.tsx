import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Inputs = z.infer<typeof schema>;

//! Without ZOD
// type Inputs = {
//   email: string;
//   password: string;
// };
const GoodForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Resolved!");
        }, 1000);
      });
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Account already exists!",
      });
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input">
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          //! Before ZOD
          //   {...register("email", {
          //     required: "Email is reuqired!",
          //     // pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          //     validate: (data) => {
          //       if (!data.includes("@")) {
          //         return "Email must contain '@' !";
          //       }
          //       return true;
          //     },
          //   })}
        />
        {errors.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div className="input">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          //! Before ZOD
          //   {...register("password", {
          //     required: "Password is required!",
          //     minLength: {
          //       value: 8,
          //       message: "Password must be at least 8 characters long!",
          //     },
          //   })}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root?.message && <span>{errors.root.message}</span>}
    </form>
  );
};

export default GoodForm;
