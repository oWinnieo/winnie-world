import { useSession } from "next-auth/react"; // wtest auth
import { userInfo } from '@/constants/userInfo' // wtest mock
export const sessionInfo = () => {
    // const { data: session } = useSession(); // wtest auth
    /* wtest auth mock */
        const session = {
            user: userInfo
            // user: {}
        }
        // console.log('session', session)
        /* /wtest auth mock */
    return session
}