'use client'
import { RouterButton } from "../routerButton"
// import { useSession, signIn, signOut } from 'next-auth/react'; // wtest auth
import './navbar.scss';
export const Navbar = () => {
    // const { data: session } = useSession(); // Access the current session // wtest auth
    return (
        <div className="navbar">
            <div className="navbar-in">
                <RouterButton />
                {/* {session ? (
                <div>
                <p>Welcome, {session.user.name}</p>
                <button onClick={() => signOut()}>Sign Out</button>
                </div>
            ) : (
                <button onClick={() => signIn('google')}>Sign In with Google</button>
            )} */}
            </div>
        </div>
    )
}