'user client'
import { Smile } from 'lucide-react'
import './avatarOfUser.scss'
export const AvatarOfUser = ({ className, srcImage }) => {
    return srcImage ? <img className={`auth-avatar ${className ? className : ''}`} src={srcImage} alt="User Avatar" /> : <Smile className={`${className}`} />
}


