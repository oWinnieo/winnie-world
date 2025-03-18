import { useSession } from "next-auth/react"; // wtest auth
import { userInfo } from '@/constants/userInfo' // wtest mock
import { getServerSession } from 'next-auth'
// import { authOptions } from '../../../pages/api/auth/[...nextauth]' // wtest here why user api报错?
export const sessionInfo = () => {
    const { data: session } = useSession(); // wtest auth
    /* wtest auth mock *
    const session = {
        user: userInfo
        // user: {}
    }
    // console.log('userInfo', userInfo)
    /* /wtest auth mock */
    console.log('session (from_ sessionInfo)', session)
    return session
}

// export const sessionInfoServer = async () => {
//     const session = await getServerSession(authOptions);
//     /* wtest auth mock *
//         const session = {
//             user: userInfo
//             // user: {}
//         }
//         // console.log('userInfo', userInfo)
//         // console.log('session', session)
//         /* /wtest auth mock */
//     return session
// }