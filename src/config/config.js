export const config = {
  url: {
    ASSET_URL: import.meta.env.VITE_ASSET_URL,
    BASE_URL: import.meta.env.VITE_BASE_URL,
    STRIPE_TOKEN_URL: import.meta.env.VITE_STRIPE_TOKEN_URL,
  },
  key: {
    PUBLISHABLE_KEY: import.meta.env.VITE_PUBLISHABLE_KEY,
  },
};
