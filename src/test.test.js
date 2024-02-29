const googleSignIn = async () => {
  const { error, user, session } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: ["https://www.googleapis.com/auth/calendar", "https://mail.google.com/"],
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });

  if (error) {
    // If there is an error, log the error and don't proceed further
    alert("Error logging in to Google provider with Supabase");
    console.log(error);
  } else if (user && session) {
    // Call fetchGoogleEvents only if the login was successful (i.e., user and session are not null)
    fetchGoogleEvents();

    // Here, you need to handle token refreshing logic
    // Check if the access token is expired and refresh it if necessary
    if (isTokenExpired(session.access_token)) {
      try {
        // Call a function to refresh the token using the refresh token
        const refreshedSession = await supabase.auth.refreshSession();

        // Update the session object with the refreshed token
        if (refreshedSession) {
          session.access_token = refreshedSession.access_token;
          session.provider_token = refreshedSession.provider_token;
          // You may need to update other relevant session properties here
        }
      } catch (refreshError) {
        console.error("Error refreshing session:", refreshError);
        // Handle refresh token error gracefully
        // Prompt the user to re-authenticate or take appropriate action
      }
    }

    // Proceed with your existing code to perform further actions
    sendToken(
      {
        AccessToken: session.access_token,
        ProviderToken: session.provider_token,
        RefreshToken: session.refresh_token,
        TokenType: session.token_type,
        UserId: Number(loggedInUser.userId),
        UserEmail: session.user.email,
      },
      getDashboardData
    );
    getDashboardData();

    // Set cookies if needed
    Cookies.set("ProviderToken", session.provider_token, { expires: 7 });
    Cookies.set("UserEmailGoogle", session.user.email, { expires: 7 });
  }
};

// Function to check if the token is expired
const isTokenExpired = (accessToken) => {
  // Implement your logic to check if the token is expired
  // Compare the current timestamp with the token's expiration timestamp
  // Return true if the token is expired, false otherwise
};
