import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import './userItem.scss'
export const UserItem = ({ data }) => {
    return (
        <div className="area-user">
            <div className="area-avatar">
                {/* <img className="auth-avatar" src={data.image} alt="User Avatar" /> */}
                <AvatarOfUser
                    srcImage={data.image}
                ></AvatarOfUser>
            </div>
            <div className="area-info">
                <p>name: {data.name}</p>
                <p>userId: {data.userId}</p>
                <p>_id: {data._id}</p>
                <p>email: {data.email}</p>
                <p>role: {data.role}</p>
            </div>
        </div>
    )
}