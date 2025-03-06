'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import './auth.scss'
export const Auth = () => {
    const { data: session } = useSession(); // wtest backup
    return (
        <div className="area-auth">
            {session ? (
                <>
                    <p className="auth-welcome">Welcome, {session.user.name}!</p>
                    <img className="auth-avatar" src={session.user.image} alt="User Avatar" />
                    <button onClick={() => signOut()} className="btn-signout">Sign out</button>
                </>
            ) : (
                <button onClick={() => signIn("google")} className="btn-signin">Sign in</button>
            )}
        </div>
    )
}

