// 普通用户登录
const ifLogined = ({ session }) => {
    return session?.user?.userId ? true : false
}

// 超级管理员登录
const ifLoginedAdmin = ({ session }) => {
    return ifLogined({ session }) && session.user.role === 'mainAdmin'
}

// 包含作者信息
const ifWithAuthorInfo = ({ authorInfo }) => {
    return authorInfo?.userId
}

// 有数据, 需要登录和作者同一个人
const userLoginedSameWithAuthor = ({ session, data, authorInfo }) => {
    return ifLogined({ session }) && ifWithAuthorInfo({ authorInfo}) && data && authorInfo.userId === session.user.userId
}

const editOrAddBtnStatusCheck = ({ group, data, authorInfo, session }) => {
    switch (group) {
        case 'learning':
            // learning 模块
            // 如果有数据, 需要登录和作者同一个人
            // 如果无数据, 即添加, 只需要已登录
            return data ? userLoginedSameWithAuthor({ session, data, authorInfo }) : ifLogined({ session })
        case 'management':
            return ifLoginedAdmin({ session })
    }
}

export {
    ifLogined,
    ifLoginedAdmin,
    ifWithAuthorInfo,
    userLoginedSameWithAuthor,
    editOrAddBtnStatusCheck
}