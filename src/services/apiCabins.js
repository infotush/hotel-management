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

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //1 create image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //create a new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  }

  //edit a cabin
  if (id) {
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    return new Error("Cabins could not be deleted");
  }

  //2 upload image
  if (hasImagePath) return data;

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
