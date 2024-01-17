import { createClient } from "@supabase/supabase-js";

const supabaseConexion = createClient(
  "https://kbklonufmcjitkdzrncz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia2xvbnVmbWNqaXRrZHpybmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4OTc5MzksImV4cCI6MjAyMDQ3MzkzOX0.roaINVE5mXS_ZbXjipRoZ4DgBFeLBQ3rLIepQXUbMa4"
);

export { supabaseConexion };