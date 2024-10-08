import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.SUPABASE_URL;
//const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(
  'https://csvynqvqvkcrpbzfxyxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzdnlucXZxdmtjcnBiemZ4eXh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjE4MjYzMCwiZXhwIjoyMDQxNzU4NjMwfQ.5r6w6azzO-ani55_z4EE3l5NNB8poBVlXa7H1ZG3n6M',
);
