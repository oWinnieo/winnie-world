'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { Image } from 'next/image'
import './auth.scss'
export const Auth = () => {
    const { data: session } = useSession();
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
    /* /wtest *
    const session = null
    /* /wtest */
    return (
        <div className="area-auth">
            {/* <p>session: {session && JSON.stringify(session)}</p> */}
            {session ? (
                <>
                <p className="auth-welcome">Welcome, {session.user.name}({session.user.id})!</p>
                
                <Image className="auth-avatar" src={session.user.image} alt="User Avatar" />
                <button onClick={() => signOut()} className="btn-signout">Sign out</button>
                </>
            ) : (
                <button onClick={() => signIn("google")} className="btn-signin">Sign in</button>
            )}
        </div>
    )
}

// {/* <p>id: {session.user.id}</p> */}
//                 {/* <p>tokenSub: {session.user.tokenSub}</p> */}
//                 {/* <p>accessToken: {session.user.accessToken}</p> */}