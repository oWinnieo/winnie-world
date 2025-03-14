import { AreaTitle } from '@components/areaTitle/areaTitle'
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { tips } from '@/constants/tips'
import './userProfile.scss'
export const UserProfile = ({ dataUser }) => {
    return (
        <>
            <AreaTitle>Profile of {dataUser.name}</AreaTitle>
            {dataUser ? <>
                <div className="area-user-info">
                    <div>
                        <AvatarOfUser
                                srcImage={dataUser.image}
                        ></AvatarOfUser>
                    </div>
                    <div>name: {dataUser.name}</div>
                    <div>email: {dataUser.email}</div>
                    <div>role: {dataUser.role}</div>
                </div>
            </> : tips.tipDataWrong}
            <div>{tips.beingDecorated}</div>
        </>
    )
}