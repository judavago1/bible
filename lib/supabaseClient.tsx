import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xicwwhzvzcpwngwdfkft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpY3d3aHp2emNwd25nd2Rma2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzUwNzksImV4cCI6MjA3ODIxMTA3OX0.3HglU5XsdrgQAnuFojd1lS_f8mDmRnF1CrfvHyFdw48';
export const supabase = createClient(supabaseUrl, supabaseKey);
