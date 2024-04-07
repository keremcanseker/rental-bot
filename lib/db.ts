"use server";
import { createSupabaseClientForStart } from "@/utils/supabase/server";
import { getUserIdFromCurrentSession } from "./auth";

export type Url = {
  url: string;
  created_at: string;
};

export async function getUrls(): Promise<Url[] | { error: string }> {
  const supabase = await createSupabaseClientForStart();
  const user = await getUserIdFromCurrentSession();
  console.log(user);
  const { data, error } = await supabase
    .from("urls")
    .select("url, created_at")
    .eq("user", user);

  if (error) {
    return { error: error.message };
  }
  return data as Url[];
}
