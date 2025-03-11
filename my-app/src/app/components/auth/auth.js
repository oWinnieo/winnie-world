'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { userInfo } from '@/app/mock/userInfo' // wtest mock
// import { Image } from 'next/image'
import './auth.scss'
import { useEffect, useState } from "react";
export const Auth = () => {
    const { data: session } = useSession(); // wtest backup
    /* wtest auth mock *
    const session = {
        user: userInfo
    }
    /* /wtest auth mock */
    const getTesting = () => {
        // const accessToken = localStorage.getItem('access_token')
        // const refreshToken = localStorage.getItem('refresh_token')
        console.log('~~~~~~~~~~~ in getTesting session', session)
        // console.log('accessToken', accessToken, 'refreshToken', refreshToken)
    }
    const signInHandler = async () => {
        // const {account ,user} = await signIn("google")
        const signInRes = await signIn("google")
        // console.log('account', account, 'user', user)
        // if (typeof window !== 'undefined') { // wtest backup && account?.access_token
        //     console.log('??')
        //     // localStorage.setItem('access_token', account.access_token);
        //     // localStorage.setItem('refresh_token', account.refresh_token);
        //     localStorage.setItem('access_token', 'aa111');
        //     localStorage.setItem('refresh_token', 'aa222');
        // }
    }
    const signOutHandler = async () => {
        const signOutRes = await signOut()
        // if (typeof window !== 'undefined') {
        //     localStorage.removeItem('access_token')
        //     localStorage.removeItem('refresh_token')
        // }
    }
    /* wtest *
    const session = {
        "user": {
            "name":"Ryuuna R",
            "email":"ryuuna2010@gmail.com",
            "image":"https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c"
        },
        "expires":"2025-04-05T16:26:40.823Z"
    }
    /* /wtest */
    useEffect(() => {
        // // localStorage.setItem('access_token', '111');
        // // localStorage.setItem('refresh_token', '222');
        // if (!session) {
        //     const accessToken = localStorage.getItem('access_token')
        //     const refreshToken = localStorage.getItem('refresh_token')
        //     // setToken(accessToken);
        //     console.log('============= in useEffect')
        //     console.log('accessToken', accessToken, 'refreshToken', refreshToken)
        // }
        // // else {
        // //     setSessionData(session)
        // // }
        
    })
    return (
        <div className="area-auth">
            {/* <p>session: {session && JSON.stringify(session)}</p> */}
            <button onClick={getTesting}>get token wtest</button> - 
            {/* <button onClick={signOutHandler}>clear token wtest</button> */}
            {session ? (
                <>
                    <p>wtest: {session?.user?.userId ? session.user.userId : '?'} ~~ &nbsp;</p>
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

