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
  // callbacks: {
  //   async session({ session, token }) {
  //     session.user.id = token.sub; // 让 session 里包含用户 ID
  //     return session;
  //   },
  // },
  pages: {
    signIn: '/signin'
  },
  baseUrl: process.env.NEXTAUTH_URL, // optional wtest
};

export default NextAuth(authOptions);


// import NextAuth from "next-auth";
//   //  import Providers from "next-auth/providers";
//   import GoogleProvider from "next-auth/providers/google";

//    export default NextAuth({
//      providers: [
//       GoogleProvider({
//          clientId: process.env.GOOGLE_CLIENT_ID,
//          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//        }),
//        // 其他提供者...
//      ],
//      callbacks: {
//        async signIn(user, account, profile) {
//          // 自定义登录逻辑
//          return true;
//        },
//        async redirect(url, baseUrl) {
//          // 自定义重定向逻辑
//         //  return url.startsWith(baseUrl) ? url : baseUrl;
//         return process.env.NEXTAUTH_URL + "/api/auth/callback/google" // wtest
//        },
//        async session(session, user) {
//          // 自定义会话逻辑
//          return session;
//        },
//        async jwt(token, user, account, profile, isNewUser) {
//          // 自定义 JWT 逻辑
//          return token;
//        },
//      },
//      pages: {
//        signIn: '/auth/signin',
//        signOut: '/auth/signout',
//        error: '/auth/error', // 错误页面
//        verifyRequest: '/auth/verify-request',
//        newUser: '/auth/new-user'
//      }
//    });