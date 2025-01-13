'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export const RouterButton = () => {
    const router = useRouter()
    return (
        <div>
            {/* <button onClick={() => router.back()}>Back</button> */}
            {/* <button onClick={() => router.push('/')}>Home</button> */}
            <Link href={"/"}>Back Home</Link>
        </div>
    )
}