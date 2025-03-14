'user client'
import { Smile } from 'lucide-react'
import './avatarOfUser.scss'
export const AvatarOfUser = ({ srcImage }) => {
    return srcImage ? <img className="auth-avatar" src={srcImage} alt="User Avatar" /> : <Smile />
}


