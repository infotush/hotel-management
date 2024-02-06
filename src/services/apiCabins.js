import supabase, { supabaseUrl } from "./supabase.js";

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
  //1 create image name

  //https://objahdmwavlygpgvsefl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-01-14T17%3A04%3A41.346Z
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imageUrl }])
    .select();

  if (error) {
    return new Error("Cabins could not be deleted");
  }
  //2 upload image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if the image is not uploaded

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded and the cabin is deleted");
  }
  return data;
}
