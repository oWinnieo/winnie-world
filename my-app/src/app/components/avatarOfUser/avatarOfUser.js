'user client'
// import { useSession } from "next-auth/react"; // wtest auth
import { Smile } from 'lucide-react'
import { Image } from 'next/image'
import './avatarOfUser.scss'
export const AvatarOfUser = ({ srcImage }) => {
    // const { data: session } = useSession(); // wtest
    console.log('srcImage', srcImage)
    return (srcImage ? <Image className="auth-avatar" src={srcImage} alt="User Avatar" /> : <Smile />)
}


