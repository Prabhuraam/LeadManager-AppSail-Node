let auth0Client = null;
let isAuthenticated = false;
const red_uri =
  window.location.protocol +
  "//" +
  window.location.hostname +
  "/index.html";
 
  const login = async () => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: red_uri,
      },
    });
  };

 const attack = async () => {
    await configureClient();
    await login()
    debugger;
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
      document.body.innerHTML =
        "You are currently logged in. Redirecting you to the home page..";
      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    }
  };

  const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
    debugger;
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    });
  };

  const logout = () => {
    debugger;
    auth0Client.logout({});
    catalyst.auth.signOut(red_uri);
  };

  const fetchAuthConfig = () => fetch("./auth_config.json");