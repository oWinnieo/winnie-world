'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import './auth.scss'
export const Auth = () => {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col items-center mt-20">
            <p>session: {session && JSON.stringify(session)}</p>
            {session ? (
                <>
                <p>Welcome 123, {session.user.name}!</p>
                <img src={session.user.image} alt="User Avatar" className="w-16 h-16 rounded-full mt-2" />
                <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Sign out
                </button>
                </>
            ) : (
                <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign in with Google
                </button>
            )}
        </div>
    )
}