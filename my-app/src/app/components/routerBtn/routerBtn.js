'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import './routerBtn.scss'

export const RouterBtn = ({ className, accessStatus, btnClick }) => {
    const pathName = usePathname()
    const pathParamArr = pathName.split('/')
    const groupName = `/${pathParamArr[1]}`
    const router = useRouter()
    const btnClickHandler = (link) => {
        router.push(link)
        btnClick && btnClick()
    }
    const setClassName = (url) => {
        return `${groupName === url ? 'btn-activated' : ''}
                ${pathParamArr.length <= 2 && groupName === url ? 'btn-disabled' : ''}`
    }
    return (
        <div className={`area-routerBtn ${className}`}>
            {/* <p>wtest ~ {JSON.stringify(pathParamArr)} ~</p> */}
            {/* <button onClick={() => router.back()}>Back</button> */}
            {/* <button onClick={() => router.push('/')}>Home</button> */}
            <button className={setClassName('/')} onClick={() => btnClickHandler("/")}>Home</button>
            <button className={setClassName('/learning')} onClick={() => btnClickHandler("/learning")}>Learning</button>
            <button className={setClassName('/about')} onClick={() => btnClickHandler("/about")}>About Me</button>
            {accessStatus && <button className={setClassName('/management')} onClick={() => btnClickHandler("/management")}>Management</button>}
        </div>
    )
}
