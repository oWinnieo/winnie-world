'use client'
import { useRouter } from "next/navigation";

export const RouterButton = () => {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.back()}>Back</button>
            <button onClick={() => router.push('/')}>Home</button>
        </div>
    )
}