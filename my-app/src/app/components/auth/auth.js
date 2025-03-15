'use client'
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { useRouter } from 'next/navigation';

// import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './auth.scss'
export const Auth = ({ session }) => {
    console.log('session auth', session)
    /* wtest auth mock *
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
    const [showNav, setShowNav] = useState(false)
    const toggleNav = () => {
        setShowNav(val => !val)
    }
    const router = useRouter()
    const showProfile = () => {
        router.push(`/profile/${session.user.userId}`)

    }
    return (
        <div className="area-auth">
            {/* <p>session: {session && JSON.stringify(session)}</p> */}
            {/* <button onClick={getTesting}>get token wtest</button> -  */}
            {/* <button onClick={signOutHandler}>clear token wtest</button> */}
            {session ? (
                <>
                    {/* <p>wtest: {session?.user?.name ? session.user.name : '?'} ~~ &nbsp;</p> */}
                    <p className="auth-welcome">Welcome, {session.user.name}({session?.user?.role})!</p>
                    {/* <img className="auth-avatar" src={session.user.image} alt="User Avatar" /> */}
                    <span onClick={toggleNav}>
                        <AvatarOfUser
                            srcImage={session.user.image}
                        ></AvatarOfUser>
                    </span>
                    {/* <div className="area-user-tools area-user-tools-web">
                        <button
                            className="btn btn-signout"
                            onClick={signOutHandler}>Sign out</button>
                    </div> */}
                    {showNav && 
                        <div className="area-user-tools area-user-tools-mobile">
                            <button
                                className="btn"
                                onClick={showProfile}>Profile</button>
                            <button
                                className="btn btn-signout"
                                onClick={signOutHandler}>Sign out</button>
                        </div>
                        }
                </>
            ) : (
                <>
                    <p className="auth-tip">Google account? </p>
                    <button onClick={signInHandler} className="btn btn-signin">Sign in</button>
                </>
            )}
        </div>
    )
}

