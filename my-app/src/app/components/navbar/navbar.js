'use client'
import { AlignJustify } from 'lucide-react'
import { RouterBtn } from "../routerBtn/routerBtn"
import { Auth } from '@components/auth/auth'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './navbar.scss';
import { useState } from 'react'
export const Navbar = () => {
    const session = sessionInfo()
    // console.log('session nav', session) // wtest
    // wtest ifLoginedAsAdmin()
    const [showNav, setShowNav] = useState(false)
    const toggleNav = () => {
        setShowNav(val => !val)
    }
    return (
        <div className="navbar">
            <div className="navbar-in">
                <div className="area-nav">
                    <span className="btn-click" onClick={toggleNav}><AlignJustify /></span>
                    <RouterBtn
                        className="area-router-for-web"
                        accessStatus={session?.user?.role && session.user.role === 'mainAdmin'} />
                    {
                        showNav &&
                        <RouterBtn
                            className="area-router-for-mobile"
                            accessStatus={session?.user?.role && session.user.role === 'mainAdmin'} />
                    }
                </div>
                <Auth
                    session={session}
                ></Auth>
            </div>
        </div>
    )
}