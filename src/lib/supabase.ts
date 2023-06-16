import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
   'https://cfahlqrzfodhlwggkivx.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYWhscXJ6Zm9kaGx3Z2draXZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Njg3Mzk1MywiZXhwIjoyMDAyNDQ5OTUzfQ.FByhr0McLdCkOgsiB2CTO3kFsJ08sNs9raKdS8FSKF4'
);
