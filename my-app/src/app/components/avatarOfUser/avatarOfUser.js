'user client'
import { useSession } from "next-auth/react"; // wtest auth
import { Smile } from 'lucide-react'
import { Image } from 'next/image'
import './avatarOfUser.scss'
export const AvatarOfUser = ({ srcImage }) => {
    const { data: session } = useSession(); // wtest
    return session?.user?.image ? <Image className="auth-avatar" src={session?.user?.image} alt="User Avatar" /> : <Smile />
}


