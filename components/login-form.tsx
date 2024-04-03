import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn, SignInSchema } from "@/lib/schema";
import { signInWithEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import Router from "next/router";
import { useRouter } from "next/navigation";

export default function LoginForm({ setIsRegister }: { setIsRegister: any }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignIn) => {
    const result = await signInWithEmail({
      email: data.email,
      password: data.password,
    });

    if (result.includes("successfully")) {
      toast.success("You have successfully signed in");
      router.push("/home");
    }
    // toast.error(result);
  };

  return (
    <form id="signup" onSubmit={handleSubmit(onSubmit)}>
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
        Sign In
      </Button>
      <p className="text-center text-muted-foreground ">
        Already have an account?{" "}
        <a
          onClick={() => setIsRegister(true)}
          className="hover:underline text-primary hover:cursor-pointer"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
