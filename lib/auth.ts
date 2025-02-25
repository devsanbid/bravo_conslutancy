import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export async function signUp(data: {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: Date;
  phone?: string;
}) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function verifyOTP(email: string, token: string) {
  // This is a mock function since Supabase doesn't directly support OTP
  // You would need to implement your own OTP verification system
  return true;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return profile;
}

export async function updateProfile(profile: Partial<Profile>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserRole(userId: string, role: 'admin' | 'moderator' | 'student') {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function isEmailVerified() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email_confirmed_at ? true : false;
}