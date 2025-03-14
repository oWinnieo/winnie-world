'use client'
import { RouterBtn } from "../routerBtn/routerBtn"
import { Auth } from '@components/auth/auth'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './navbar.scss';
export const Navbar = () => {
    const session = sessionInfo()
    // wtest ifLoginedAdmin()
    return (
        <div className="navbar">
            <div className="navbar-in">
                <RouterBtn accessStatus={session?.user?.role && session.user.role === 'mainAdmin'} />
                <Auth></Auth>
            </div>
        </div>
    )
}