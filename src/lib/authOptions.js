
import { LoginUser } from "@/app/actions/auth/LoginUser";
import dbConnect from "./dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = await LoginUser(credentials);

        if (!user) return null;

        // 🔥 MUST return role
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // 👈 admin / user
        };
      },
    }),
    // GoogleProvider({
    //     clientId:process.env.GOOGLE_CLIENT_ID,
    //     clientSecret:process.env.GOOGLE_CLIENT_SECRET
    // })
  ],

  // ✅ pages (not page)
  pages: {
    signIn: "/login",
  },

  // ✅ callbacks (not callback)
  callbacks: {
    // 🔐 JWT token এ role ঢুকবে
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // 🔐 session এ role যাবে
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },

    // ✅ signIn (not singIn)
    async signIn({ user, account }) {
      if (account) {
        const userCollection = await dbConnect("userInfo");

        const isExisted = await userCollection.findOne({
          email: user.email,
        });

        if (!isExisted) {
          await userCollection.insertOne({
            email: user.email,
            name: user.name,
            role: user.role,
          });
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
