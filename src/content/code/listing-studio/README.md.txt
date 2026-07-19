# Listing Studio

A private, owner-only Next.js workspace that runs a digital-products business
end to end: listing creation and validation, Etsy and YouTube integrations,
a bounded daily content pipeline, and the product factory that builds what
the shop sells.

> Owner-only production system. The storefront stays unnamed here; these
> excerpts are the generic engineering pieces.

## Runtime modes

| Mode | Relational data | Product files |
| --- | --- | --- |
| Local Windows development | SQLite | Private filesystem storage |
| Vercel hosting | Neon Postgres | Private Vercel Blob, presigned browser uploads |

Both modes run the same application code behind one persistence boundary.

## Foundation

- Owner bootstrap, password login, opaque database-backed sessions, and
  protected routes; single-use recovery with full session revocation
- Owner-only Etsy OAuth with PKCE, exact shop/user verification, encrypted
  refresh-token storage, and deliberately minimal scopes (no deletion, no
  transaction writes)
- YouTube Shorts studio with exact-channel OAuth verification, encrypted
  tokens, and guarded private uploads
- A pausable daily content cycle that drafts one Shorts script/storyboard a
  day through a bounded rotation and stops at seven items awaiting review
- A dependency-free product factory building twelve calculator applications,
  with packaging, QA, and production smoke checks for every surface

## Layout

- `auth/session.ts` - opaque hashed session tokens, DB-backed, revocable
- `etsy/crypto.ts` - AES-GCM secret envelopes with versioned keys
- `etsy/service.ts` - the OAuth connection: exact scopes or no connection
