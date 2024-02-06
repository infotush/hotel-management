import supabase from "./supabase.js";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    return new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    return new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    return new Error("Cabins could not be deleted");
  }
  return data;
}
