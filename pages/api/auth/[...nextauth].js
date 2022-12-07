import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        //TODO: send username and pass to backend
        const req = {
          username: credentials.username,
          password: credentials.password,
        };

        //TODO parse out the JWT token returned
        /*function parseJwt(token) {
          return JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
        }*/

        //TODO: write check that its good
        if (credentials.username === "test") {
          return { username: "test", isAdmin: true, jwt: "THEJWT" };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      //no user obj first run
      if (user) {
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.jwt = user.jwt;
      }

      return token;
    },
    session: ({ session, token }) => {
      //no token first run
      if (token) {
        session.username = token.username;
        session.isAdmin = token.isAdmin;
        session.jwt = token.jwt;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
