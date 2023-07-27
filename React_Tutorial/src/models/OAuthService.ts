import { UserManager, User } from "oidc-client";

const config = {
    authority: "https://accounts.google.com",
    client_id: "971417249125-c779v3enm55dlag2d3bf59j8g5238sqj.apps.googleusercontent.com", // replace with your actual client_id
    redirect_uri: "http://localhost:8080/secure",
    response_type: "code",
    scope:"openid profile email",
    post_logout_redirect_uri: "http://localhost:8080/",
};

const userManager = new UserManager(config);

export async function loadUserFromStorage() {
    try {
        let user = await userManager.getUser();
        if (!user) {
            await userManager.signinRedirect();
            user = await userManager.getUser();
        }
        return user;
    } catch (e) {
        console.error(`User loading error: ${e}`);
    }
}

export function logout() {
    userManager.signoutRedirect();
}