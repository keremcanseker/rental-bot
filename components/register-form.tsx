import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema, SignUp } from "@/lib/schema";
import { signUpWithEmail } from "@/lib/auth";
export default function RegisterForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUp) => {
    const result = await signUpWithEmail({
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
    });

    if (result) {
      toast.success(result);
    }
  };

  return (
    <form id="signup" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 justify-between">
        <div className="w-full">
          {" "}
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="w-full">
          {" "}
          <Label htmlFor="surname">Sur Name</Label>
          <Input
            id="surname"
            placeholder="Doe"
            {...register("surname", { required: true })}
          />
          {errors.surname && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
      </div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <p className="text-red-500">This field is required</p>}
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        placeholder="••••••••"
        className="text-2xl"
        {...register("password", { required: true })}
        type="password"
      />
      {errors.password && (
        <p className="text-red-500">This field is required</p>
      )}
      <Button className="w-full my-2" type="submit" form="signup">
        Sign Up
      </Button>
    </form>
  );
}
