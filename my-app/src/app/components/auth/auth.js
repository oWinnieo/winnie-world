'use client'
import { signIn, signOut } from "next-auth/react";
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './auth.scss'
export const Auth = () => {
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    const getTesting = () => {
        console.log('~~~~~~~~~~~ in getTesting session', session)
    }
    const signInHandler = async () => {
        const signInRes = await signIn("google")
    }
    const signOutHandler = async () => {
        const signOutRes = await signOut()
    }
    return (
        <div className="area-auth">
            {/* <p>session: {session && JSON.stringify(session)}</p> */}
            {/* <button onClick={getTesting}>get token wtest</button> -  */}
            {/* <button onClick={signOutHandler}>clear token wtest</button> */}
            {session ? (
                <>
                    {/* <p>wtest: {session?.user?.userId ? session.user.userId : '?'} ~~ &nbsp;</p> */}
                    <p className="auth-welcome">Welcome, {session.user.name}!</p>
                    {/* <img className="auth-avatar" src={session.user.image} alt="User Avatar" /> */}
                    <AvatarOfUser
                        srcImage={session.user.image}
                    ></AvatarOfUser>
                    <button onClick={signOutHandler} className="btn-signout">Sign out</button>
                </>
            ) : (
                <>
                    <p className="auth-tip">If you have a Google account? </p>
                    <button onClick={signInHandler} className="btn-signin">Sign in</button>
                </>
            )}
        </div>
    )
}

