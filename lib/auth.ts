import { createClient } from "@/utils/supabase/client";
import { createSupabaseClientForStart } from "@/utils/supabase/server";

export async function signUpWithEmail({
  email,
  password,
  name,
  surname,
}: {
  email: string;
  password: string;

  name: string;
  surname: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log(error.message);
    return JSON.stringify(error);
  }
  const user_id = data.user?.id;

  const { error: error1 } = await supabase.from("users").insert({
    name: name,
    surname: surname,
    id: user_id,
  });
  if (error1) {
    console.log(error1.message);
    return JSON.stringify(error1);
  }

  return JSON.stringify("You have successfully signed up");
}

export async function getUserSession() {
  const supabase = await createSupabaseClientForStart();
  return await supabase.auth.getSession();
}

// LOGOUT
export async function logOut() {
  const supabase = await createClient();

  return await supabase.auth.signOut();
}

// SIGNIN WITH EMAIL
export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("test signin");
  console.log(result);

  if (result.error) {
    // console.log(result.error.message);
    return JSON.stringify(result.error.message);
  }
  // console.log(result.error?.error);
  return JSON.stringify("successfully");
}

// get user data with id
export async function getUserWithId(id: string) {
  const supabase = await createClient();
  const data = await supabase.from("user").select("*").eq("user_id", id);
  // console.log(data);
  return data;
}

// get user id from session
export async function getUserIdFromCurrentSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id;
}

export async function getUserEmailFromCurrentSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.user.email;
}
