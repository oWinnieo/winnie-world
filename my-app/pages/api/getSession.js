import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { userInfo } from '@/constants/userInfo' // wtest mock
export const getSession = async () => {
    const session = await getServerSession(authOptions);
    /* wtest auth mock *
    // wtest here session 服务端的没有获取到, why
    const session = {
        user: userInfo
        // user: {}
    }
    /* /wtest auth mock */
    return session ? session : null
}
