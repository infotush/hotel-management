import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://objahdmwavlygpgvsefl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iamFoZG13YXZseWdwZ3ZzZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNTM3MjgsImV4cCI6MjAyMDcyOTcyOH0.aZLzuB0mGpP4OJDfD-vgdKX5it1XGBUnxt9BYCvaNc0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
