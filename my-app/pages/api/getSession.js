/* wtest auth mock wtest here server session */
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { userInfo } from '@/constants/userInfo' // wtest mock
/* /wtest auth mock */


export const getSession = async () => {
    /* wtest auth mock */
    const session = await getServerSession(authOptions);
    /* /wtest auth mock */
    /* wtest auth mock *
    // wtest here session 服务端的没有获取到, why
    const session = {
        user: userInfo
        // user: {}
    }
    /* /wtest auth mock */
    console.log('session (from_ getServerSession) >>>>>>>>------------------', session ? session : null)
    return session ? session : null
}
// console.log('wtest fetch item >>>>>>>>>>>>>>>>>>>>>>>>>>>> 2')
// console.log('wtest fetch item >>>>>>>>>>>>>>>>>>>>>>>>>>>> 1', session)