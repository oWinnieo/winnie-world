// 'use client'
// import dbConnect from '../../../../lib/db';
/* wtest user */
import { modelUser } from 'models/users';
/* /wtest user */

const urlDomainUser = `${process.env.URL_DOMAIN}/api/learning` // wtest users / learning

export const userCheckedHandler = async ({ user, type }) => {
    if (!user) return ({ success: false, message: 'no user '})
        const {
            name,
            email,
            image,
            userId
        } = user
    switch (type) {
        case 'add':
            try {
                const res = await fetch(`${urlDomainUser}?collectionName=user&fetchType=one`, {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        image,
                        userId,
                        role: 'viewer'
                    }) // wtest user: params.user
                })
                const dataRes = await res.json();
                if (dataRes.success) {
                    return dataRes
                } else {
                    return dataRes
                    // throw new Error('Failed to create an item.')
                }
            } catch (err) {
                console.log(err)
            }
            break;
        case 'update':
            try {
                const res = await fetch(`${urlDomainUser}?collectionName=user&fetchType=one`, {
                    method: 'PUT',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        ...user,
                        id: user._id,
                        updatedAt: new Date(),
                    }) // wtest user: params.user
                })
                const dataRes = await res.json();
                if (dataRes.success) {
                    return dataRes
                } else {
                    return dataRes
                    // throw new Error('Failed to update an item.')
                }
            } catch (err) {
                console.log(err)
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
    
}
export const userInfoHandler = async ({ user }) => {
    const { userId, email } = user
    
    const { data, success, message } = await fetch(`${urlDomainUser}?collectionName=user&fetchType=one&userId=${userId}&email=${email}`, {
        cache: 'no-store', // 等效于 SSR 的行为
    }).then(res => res.json())
    
    if (!data) {
        return ({ success, message })
    } else {
        return ({ success, message, data })
    }
}

/* wtest mock */
export const userInfoHandlerAfterLogin = async ({ user }) => {
    const { success, message, data } = await userInfoHandler({ user })
    let resUserHandledRes
    if (data) {
        // console.log('up 1 =============>')
        /* wtest wait for confirming */
        // resUserHandledRes = await userCheckedHandler({ user: {
        //     ...data,
        //     ...user
        // }, type: 'update' })
        /* /wtest wait for confirming */
        // console.log('data', data, 'user', user)
        return { success, message, data: {
            ...data
        } }
    } else {
        // console.log('ad 1')
        resUserHandledRes = await userCheckedHandler({ user, type: 'add' })
    }
    console.log('wtest resUserHandledRes', resUserHandledRes)
    return resUserHandledRes
}

/* /wtest mock */
