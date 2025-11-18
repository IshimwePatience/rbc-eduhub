-- Create refresh_tokens table for refresh token rotation
-- Run this in your Postgres DB (adjust schema if needed)

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash varchar NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  revoked boolean DEFAULT false,
  replaced_by_token varchar,
  created_by_ip varchar,
  revoked_at timestamptz,
  revoked_by_ip varchar,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
