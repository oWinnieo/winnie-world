import { useSession } from "next-auth/react";
import { userInfo } from '@/constants/userInfo' // wtest mock

export const sessionInfo = () => {
    const { data: session } = useSession();
    /* wtest auth mock *
    const session = {
        user: userInfo
        // user: {}
    }
    // console.log('userInfo', userInfo)
    /* /wtest auth mock */
    // console.log('session (from_ sessionInfo)', session)
    return session
}
