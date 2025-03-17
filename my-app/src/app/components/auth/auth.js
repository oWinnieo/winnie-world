'use client'
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { useRouter } from 'next/navigation';

// import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './auth.scss'
export const Auth = ({ session }) => {
    // const getTesting = () => {
    //     console.log('~~~~~~~~~~~ in getTesting session', session)
    // }
    const signInHandler = async () => {
        const signInRes = await signIn("google")
    }
    const signOutHandler = async () => {
        setShowNav(false)
        const signOutRes = await signOut()
    }
    const [showNav, setShowNav] = useState(false)
    const toggleNav = () => {
        setShowNav(val => !val)
    }
    const router = useRouter()
    const showProfile = () => {
        setShowNav(false);
        router.push(`/profile/${session.user.userId}`)

    }
    return (
        <div className="area-auth">
            {/* <button onClick={getTesting}>get token wtest</button> -  */}
            {/* <button onClick={signOutHandler}>clear token wtest</button> */}
            {session ? (
                <>
                    <p className="auth-welcome">Welcome, {session.user.name}!</p>
                    <span className="btn-auth-avatar" onClick={toggleNav}>
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

