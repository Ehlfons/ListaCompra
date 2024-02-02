import { createClient } from "@supabase/supabase-js";

const supabaseConexion = createClient(
  "https://xstxkftktbmcowymiexb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzdHhrZnRrdGJtY293eW1pZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTU0MTIsImV4cCI6MjAyMjQ3MTQxMn0.DDwuEDqxgbeeYJi6V13J3Ahw2GRTP864b7NTAxD0dgg"
);

export { supabaseConexion };