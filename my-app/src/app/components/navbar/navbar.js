'use client'
import { AlignJustify } from 'lucide-react'
import { RouterBtn } from "../routerBtn/routerBtn"
import { Auth } from '@components/auth/auth'
import { sessionInfo } from 'pages/api/sessionInfo' // wtest mock
/* wtest redux */
import { strSliced, html2txt } from '@/lib/utils';
import { usePathname } from "next/navigation"
import { useSelector } from 'react-redux';
import { useAlert } from '@/app/contexts/AlertContext'
// import { useModal } from '@/app/contexts/ModalContext'
/* /wtest redux */
import './navbar.scss';
import { useEffect, useState } from 'react'
export const Navbar = () => {
    /* wtest redux */
    const { showAlert } = useAlert()
    const editPost = useSelector((state) => state.editPostCache.con)
    const pathNameCurr = usePathname()

    const showTipOfEditing = () => {
        if (pathNameCurr === editPost.pathName) return
        let msg = ''
        if (editPost.title || editPost.content) {
            msg += 'A post is on editing.'
            if (editPost.title) {
                msg += ` Title: ${strSliced(html2txt(editPost.title), 10)}`
            }
            if (editPost.content) {
                
                msg += `, content: ${strSliced(html2txt(editPost.content), 10)}`
            }
        }
        if (msg !== '') {
            showAlert({
                message: msg,
                type: "warning",
                styleType: 'keep',
                linkData: {
                    pathName: editPost.pathName
                }
            })
        }
    }
    /* /wtest redux */
    const session = sessionInfo()
    // wtest ifLoginedAsAdmin()
    const [showNav, setShowNav] = useState(false)
    const toggleNav = () => {
        setShowNav(val => !val)
    }
    const btnClick = () => {
        setShowNav(false)
    }
    
    useEffect(() => {
        showTipOfEditing()
    }, [pathNameCurr])
    
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
                            accessStatus={session?.user?.role && session.user.role === 'mainAdmin'}
                            btnClick={btnClick}/>
                    }
                </div>
                <Auth
                    session={session}
                ></Auth>
            </div>
        </div>
    )
}