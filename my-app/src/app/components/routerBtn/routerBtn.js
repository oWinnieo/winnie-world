'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import './routerBtn.scss'

export const RouterBtn = ({ className, accessStatus, btnClick }) => {
    const pathName = usePathname()
    const router = useRouter()
    const btnClickHandler = (link) => {
        router.push(link)
        btnClick && btnClick()
    }
    return (
        <div className={`area-routerBtn ${className}`}>
            {/* <button onClick={() => router.back()}>Back</button> */}
            {/* <button onClick={() => router.push('/')}>Home</button> */}
            <button className={pathName === '/' ? 'btn-activated' : ''} onClick={() => btnClickHandler("/")}>Home</button>
            <button className={pathName === '/learning' ? 'btn-activated' : ''} onClick={() => btnClickHandler("/learning")}>Learning</button>
            <button className={pathName === '/about' ? 'btn-activated' : ''} onClick={() => btnClickHandler("/about")}>About Me</button>
            {accessStatus && <button className={pathName === '/management' ? 'btn-activated' : ''} onClick={() => btnClickHandler("/management")}>Management</button>}
        </div>
    )
}
