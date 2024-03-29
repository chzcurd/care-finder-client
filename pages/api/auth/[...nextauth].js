import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser, createUser } from "../../../helpers/apiClient";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "existing user",
      id: "existing",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        //TODO: send username and pass to backend

        const req = {
          username: credentials.username,
          password: credentials.password,
        };

        const theToken = await loginUser(req);
        //console.log("back");
        //console.log(theToken);

        function parseJwt(token) {
          return JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
        }

        //TODO: write check that its good
        if (theToken) {
          const parsedToken = parseJwt(theToken);

          return {
            username: parsedToken.username,
            isAdmin: parsedToken.isAdmin,
            jwt: theToken,
          };
        } else {
          return null;
        }
      },
    }),
    //CREATE USER
    //TODO: find out if there is a new user page
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "new user",
      id: "new",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        //TODO: send username and pass to backend

        const req = {
          username: credentials.username,
          password: credentials.password,
        };

        const theToken = await createUser(req);
        //console.log("back");
        //console.log(theToken);

        function parseJwt(token) {
          return JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
        }

        //TODO: write check that its good
        if (theToken) {
          const parsedToken = parseJwt(theToken);

          return {
            username: parsedToken.username,
            isAdmin: parsedToken.isAdmin,
            jwt: theToken,
          };
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
