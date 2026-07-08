import { FollowersYouKnowResponse } from '../types'

// The kit has no @types/node; declare the bare minimum so the env overrides
// below typecheck in both Node and browser consumers.
declare const process: { env: Record<string, string | undefined> }

// API base URLs, overridable per deployment (e.g. a self-hosted EFP instance).
//
// Two override mechanisms, both optional:
//  1. Env vars — picked up here at module init. This covers Node/SSR, where
//     `process.env` is real at runtime. Each read must stay a literal
//     `process.env.NEXT_PUBLIC_*` member expression (no aliases, no optional
//     chaining) so bundlers that inline env can match it. Note that Next.js
//     only inlines env reads in application source, NOT inside node_modules —
//     browser bundles will not see these vars from the kit itself.
//  2. setIdentityKitApiUrls({ ... }) — call once at app startup with values
//     the app resolved itself (app-side env reads DO get inlined). This is
//     the reliable path for browser bundles.
//
// The URL exports are `let` bindings on purpose: ESM live bindings mean every
// importer sees the updated values on reads made after configuration.
//
// Caveat: the package ships two independent bundles (`.` and `./utils`), each
// with its own copy of this module's state — configure whichever entry points
// your app imports from (the setter is exported by both).
let efpApiUrlOverride: string | undefined
let grailsApiUrlOverride: string | undefined
let ensMetadataUrlOverride: string | undefined
try {
  efpApiUrlOverride = process.env.NEXT_PUBLIC_EFP_API_URL
  grailsApiUrlOverride = process.env.NEXT_PUBLIC_GRAILS_API_URL
  ensMetadataUrlOverride = process.env.NEXT_PUBLIC_ENS_METADATA_URL
} catch {
  // `process` is not defined — fall through to the defaults.
}

export let EFP_API_URL = efpApiUrlOverride || 'https://data.ethfollow.xyz/api/v1'
export let GRAILS_API_URL = grailsApiUrlOverride || 'https://api.grails.app/api/v1'
export let ENS_METADATA_URL = ensMetadataUrlOverride || 'https://metadata.ethid.org'

export type IdentityKitApiUrls = {
  efpApiUrl?: string
  grailsApiUrl?: string
  ensMetadataUrl?: string
}

export const setIdentityKitApiUrls = (urls: IdentityKitApiUrls): void => {
  if (urls.efpApiUrl) EFP_API_URL = urls.efpApiUrl
  if (urls.grailsApiUrl) GRAILS_API_URL = urls.grailsApiUrl
  if (urls.ensMetadataUrl) ENS_METADATA_URL = urls.ensMetadataUrl
}
export const DEFAULT_FALLBACK_AVATAR = 'https://efp.app/assets/art/default-avatar.svg'
export const DEFAULT_FALLBACK_HEADER = 'https://efp.app/assets/art/default-header.svg'

export const DEFAULT_RECENT_TAGS = ['irl', 'bff', 'based', 'degen', 'top8']

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'
export const LIGHT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(212, 212, 212, 0.9) 0%, rgba(132, 132, 132, 0.2) 50%, rgba(212, 212, 212, 0.9) 100%)'

export const THEMES = ['light', 'dark'] as const

export const noFollowersYouKnow = {
  results: [],
  length: 0,
} satisfies FollowersYouKnowResponse

export const FETCH_LIMIT = 20

// Followers and following
export const SORT_OPTIONS = ['latest first', 'earliest first', 'follower count'] as const
export const QUERY_BLOCK_TAGS = ['block', 'mute']

// Notifications
export const NOTIFICATION_POSITIONS = ['top', 'bottom', 'left', 'right'] as const
export const NOTIFICATION_ALIGNS = ['left', 'center', 'right', 'top', 'bottom'] as const
export const NOTIFICATION_CENTER_VERTICAL = ['left', 'right']

export * from './abi'
export * from './time'
export * from './chains'
export * from './socials'
export * from './records'
export * from './contracts'
export * from './transports'
export * from './transactions'
export * from './translations'
export * from './follow-button'
