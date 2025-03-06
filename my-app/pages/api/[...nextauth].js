import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000, // 将超时时间增加到 10 秒
      },
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
      },
      callbackUrl: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // 用于加密 JWT
  // session: {
  //   strategy: 'jwt', // or 'database', depending on your preference
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // 这里可以添加日志，查看登录过程中的数据
        console.log("User:", user);
        console.log("Account:", account);
        console.log("Profile:", profile);
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/signin'
  },
  baseUrl: process.env.NEXTAUTH_URL, // optional wtest
  // callbacks: {
  //   // async session({ session, token }) {
  //   //   session.user.id = token.sub; // 让 session 里包含用户 ID
  //   //   return session;
  //   // },
  //   // async signIn({ user, account, profile }) {
  //   //   console.log('signIn callback', user, account, profile);
  //   //   return true;
  //   // },
  //   // async session({ session, user }) {
  //   //   console.log('session callback', session, user);
  //   //   return session;
  //   // },
  //   async session(session, token) {
  //     // Optionally extend session data here
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);