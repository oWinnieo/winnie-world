'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import './routerBtn.scss'

export const RouterBtn = ({ accessStatus }) => {
    const router = useRouter()
    return (
        <div className="area-routerBtn">
            {/* <button onClick={() => router.back()}>Back</button> */}
            {/* <button onClick={() => router.push('/')}>Home</button> */}
            <Link href={"/"}>Back Home</Link>
            <Link href={"/learning"}>Learning</Link>
            {accessStatus && <Link href={"/management"}>Management</Link>}
        </div>
    )
}
