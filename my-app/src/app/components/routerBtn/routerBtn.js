'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import './routerBtn.scss'

export const RouterBtn = ({ className, accessStatus, btnClick }) => {
    const router = useRouter()
    const btnClickHandler = (link) => {
        router.push(link)
        btnClick && btnClick()
    }
    return (
        <div className={`area-routerBtn ${className}`}>
            {/* <button onClick={() => router.back()}>Back</button> */}
            {/* <button onClick={() => router.push('/')}>Home</button> */}
            <button onClick={() => btnClickHandler("/")}>Home</button>
            <button onClick={() => btnClickHandler("/learning")}>Learning</button>
            {accessStatus && <button onClick={() => btnClickHandler("/management")}>Management</button>}
        </div>
    )
}
