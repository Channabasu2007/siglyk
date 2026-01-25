import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          profileCompleted: user.profileCompleted,
        };
      },
    }),
  ],
  callbacks: {
    // --- OAUTH LOGIC START ---
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();

          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            dbUser = await User.create({
              email: user.email,
              passwordHash: "OAUTH_USER_PLACEHOLDER_HASH",
              isVerified: true,
              profileCompleted: false,
              role: "INDIVIDUAL",
            });
          }

          user.id = dbUser._id.toString();
          user.role = dbUser.role;
          user.isVerified = dbUser.isVerified;
          user.profileCompleted = dbUser.profileCompleted;

          return true;
        } catch (error) {
          console.error("Critical OAuth Error:", error);
          // Return false to show error page
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // 1. Initial Sign In (Google or Credentials)
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.profileCompleted = user.profileCompleted;
      }

      // 2. Poll DB to keep session up-to-date (e.g. after profile completion)
      //    This ensures client middleware sees the latest status on navigation.
      if (token.id) {
        await dbConnect();
        const dbData = await User.findById(token.id).select('isVerified profileCompleted role').lean();
        if (dbData) {
          token.isVerified = dbData.isVerified;
          token.profileCompleted = dbData.profileCompleted;
          token.role = dbData.role;
        }
      }

      // 3. Handle manual updates from client (update())
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.profileCompleted = token.profileCompleted;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};