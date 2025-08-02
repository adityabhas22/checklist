const authConfig = {
  providers: [
    {
      // Use environment variable for Clerk issuer domain
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
