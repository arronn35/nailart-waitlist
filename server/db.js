import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('\n  ✗  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
    console.error('     Copy .env.example to .env and fill in your Supabase credentials.\n');
    process.exit(1);
}

// Ignore self-signed certificate errors for local dev API calls
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function addRegistration(email, ip = null) {
    const { data, error } = await supabase
        .from('waitlist registrations')
        .insert({ email, ip })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getRegistrationById(id) {
    const { data, error } = await supabase
        .from('waitlist registrations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function getAllRegistrations() {
    const { data, error } = await supabase
        .from('waitlist registrations')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getRegistrationCount() {
    const { count, error } = await supabase
        .from('waitlist registrations')
        .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count;
}

export async function deleteRegistration(id) {
    const { data, error } = await supabase
        .from('waitlist registrations')
        .delete()
        .eq('id', id)
        .select();

    if (error) throw error;
    return { changes: data.length };
}

export async function emailExists(email) {
    const { data, error } = await supabase
        .from('waitlist registrations')
        .select('id')
        .eq('email', email)
        .maybeSingle();

    if (error) throw error;
    return !!data;
}

export default supabase;
