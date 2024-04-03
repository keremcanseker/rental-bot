import { createClient } from "@/utils/supabase/server";
import { getUserIdFromCurrentSession } from "./auth";

export async function getUrls() {
  const supabase = createClient();
  const user = await getUserIdFromCurrentSession();
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data };
}
