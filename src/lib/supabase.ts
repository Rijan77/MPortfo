import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && key ? createClient(url, key) : null;

export interface MessageRow {
  name: string;
  email: string;
  message: string;
}

export async function submitMessage(data: MessageRow): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: 'SUPABASE_NOT_CONFIGURED' };
  }
  const { error } = await supabase.from('messages').insert([data]);
  return { error: error ? error.message : null };
}
