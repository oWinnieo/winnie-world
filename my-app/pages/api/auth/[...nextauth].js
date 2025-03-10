import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userInfoHandler, userCheckedHandler } from './userInfoHandler'

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
  callbacks: {
    /*
    回调函数: 可访问的数据
    jwt: token, user, account, profile
    session: session, token
    signIn: user, account, profile
    redirect: url, baseUrl
    authorized: request, auth
    */
    /* jwt 回调 (JSON Web Token)
    该回调在用户登录时调用，并在每次请求时更新 JWT。
    	•	token: 存储在 JWT 中的令牌数据。
      •	user: 用户信息（仅在首次登录时可用）。
      •	account: 账户信息，如 access_token、refresh_token（仅在首次登录时可用）。
      •	profile: 从 Google OAuth 获取的完整用户信息（首次登录时可用）。

      //        async jwt(token, user, account, profile, isNewUser) {
          //          // 自定义 JWT 逻辑
          //          return token;
          //        },

      */
    //     async jwt({ token, user, account, profile }) {
    //       // user: 用户信息（仅在登录时可用）
    //       // account: OAuth 账户信息（仅在登录时可用）
    //       // profile: OAuth 提供的用户信息（仅在登录时可用）
    //       // token: 用于会话的 JWT（每次请求都会更新）
          
    //       if (user) {
    //         token.id = user.id; // 添加用户 ID
    //         token.accessToken = account?.access_token; // 存储 Google 访问令牌
    //         token.picture = user.image; // 头像
    //       }
    //       /* wtest another *
    //       if (account) {
    //         token.accessToken = account.access_token; // 存储 Google 访问令牌
    //         token.id = profile?.sub; // Google 用户唯一 ID
    //         token.picture = profile?.picture; // 用户头像
    //       }
    //       /* /wtest another */
    //       return token;
    //     },
    //     /*
    //     session 回调 (会话数据)

    // session 回调用于修改前端 useSession() 返回的数据。
    // 	•	session.user.id: 传递用户 ID 到前端。
    // 	•	session.user.accessToken: 传递 Google 访问令牌到前端（如调用 Google API 时使用）。
    //   */
    async session({ session, token }) {
      // console.log('wtest google session ----------> 1')
      // session: 传递到前端的会话数据
      // token: jwt 回调中的 token
      // session.user.id = token.id; // 传递用户 ID
      session.user.userId = token.sub // wtest what is it?
      // session.user.accessToken = token.accessToken; // 传递 Google 访问令牌
      session.user.image = token.picture; // 传递头像
      /* wtest another *
      session.user.id = token.id; // 传递用户 ID
      session.user.accessToken = token.accessToken; // 传递 Google 访问令牌
      session.user.image = token.picture; // 传递头像
      /* /wtest another */
      console.log('session', session)

      /* wtest *
      const { data } = await userInfoHandler({ user: session.user })
      let resUserHandledRes
      if (data) {
        // wtest waiting for update confirm
          // resUserHandledRes = await userCheckedHandler({ user: {
          //     ...data,
          //     ...session.user
          // }, type: 'update' })
          resUserHandledRes = { msg: 'waiting for update confirm' }; // wtest
      } else {
          resUserHandledRes = await userCheckedHandler({ user: session.user, type: 'add' })
      }
      // console.log('wtest resUserHandledRes', resUserHandledRes)
      /* /wtest */
      /* wtest userInfo handler */
    console.log('wait for >>> userInfoHandlerAfterLogin <<<')
    const resUserInfo = await userInfoHandlerAfterLogin({ user: session.user })
    console.log('resUserInfo', resUserInfo)
    /* /wtest userInfo handler */
      
      return session;
    },
    //     /*
    //     signIn 回调 (用户登录时触发)
    //     	•	user: 登录的用户信息（name, email, image 等）。
    // 	•	account: 账户信息（access_token, refresh_token, provider 等）。
    // 	•	profile: 从 Google 获取的完整用户数据（sub, name, email, picture 等）。
    //   */
        async signIn({ user, account, profile }) {
          // console.log('wtest google signIn ----------> 2')
          // console.log("用户信息:", user);
          // console.log("账户信息:", account);
          // console.log("OAuth 资料:", profile);
          // console.log('user wtest >>>>>>>>> 123123', user)
          
          return true; // 允许登录
          
        },
    //     /*
    //     redirect 回调 (控制登录后跳转的 URL)
    //     */
        async redirect({ url, baseUrl }) {
          // console.log('wtest google redirect ----------> 3')
          // console.log('url', url)
          // console.log('baseUrl', baseUrl)
          // return baseUrl; // 登录成功后跳转回首页
          return url.startsWith(baseUrl) ? url : baseUrl;
          // return process.env.NEXTAUTH_URL + "/api/auth/callback/google" // wtest
        },
    //     /*
    //     authorized 回调 (控制访问权限)
    //     */
    //     async authorized({ request, auth }) {
    //       return !!auth?.user; // 确保用户已登录
    //     }

      
  },
  pages: {
    signIn: '/signin',
    // signIn: '/auth/signin',
//        signOut: '/auth/signout',
//        error: '/auth/error', // 错误页面
//        verifyRequest: '/auth/verify-request',
//        newUser: '/auth/new-user'
  },
  baseUrl: process.env.NEXTAUTH_URL, // optional wtest
};

export default NextAuth(authOptions);
/* wtest *
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
/* /wtest */

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
//        
//      },
//      pages: {
//        signIn: '/auth/signin',
//        signOut: '/auth/signout',
//        error: '/auth/error', // 错误页面
//        verifyRequest: '/auth/verify-request',
//        newUser: '/auth/new-user'
//      }
//    });



/*
3. 受保护的页面（仅限登录用户访问）

在 middleware.ts 文件中，使用 authorized 回调控制访问权限：
*/
/*
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token; // 仅允许登录用户访问
    },
  },
});

export const config = { matcher: ["/dashboard"] }; // 保护 "/dashboard" 页面
*/






