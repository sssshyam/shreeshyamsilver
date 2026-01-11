-- SQL to fix Admin Login for shreeshyamsilvernokha@gmail.com
-- Run this in the Supabase Dashboard -> SQL Editor

-- 1. Enable pgcrypto for password hashing
create extension if not exists "pgcrypto";

-- 2. Insert or Update the user
DO $$
DECLARE
  v_email text := 'shreeshyamsilvernokha@gmail.com';
  v_password text := 'shreeshyamsilver@#$1234';
  v_user_id uuid;
BEGIN
  -- Check if user exists
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_email;

  IF v_user_id IS NULL THEN
    -- Create new user if not exists
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(), -- Confirmed immediately
      null,
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  ELSE
    -- Update existing user: confirm email and reset password
    UPDATE auth.users
    SET
      encrypted_password = crypt(v_password, gen_salt('bf')),
      email_confirmed_at = now(),
      updated_at = now(),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb
    WHERE id = v_user_id;
  END IF;
END $$;
