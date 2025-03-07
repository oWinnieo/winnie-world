// 'use client'
// import { useSession } from "next-auth/react"; // wtest auth
// import dbConnect from '../../../../lib/db';
/* wtest user */
import { modelUser } from 'models/users';
import { userInfo } from '@/app/mock/userInfo' // wtest mock
/* /wtest user */
export const userInfoHandler = ({ user }) => {
    // const { data: session } = useSession(); // wtest auth backup
    console.log('user >>>', user)
    /* wtest auth mock */
    // const session = {
    //     user: userInfo
    // }
    // const { userId, email } = userInfo
    /* /wtest auth mock */
    /* wtest user *
    const urlDomainUser = `${process.env.URL_DOMAIN}/api/users`
    console.log('urlDomainUser', urlDomainUser)
    // const urlDomain = `${process.env.URL_DOMAIN}/api/learning-item`
    const { data } = await fetch(`${urlDomainUser}?collectionName=user&userId=${userId}&email=${email}`, {
        cache: 'no-store', // 等效于 SSR 的行为
    }).then(res => res.json())
    // const { data } = await fetch(`${urlDomain}?collectionName=english`, {
    //     cache: 'no-store', // 等效于 SSR 的行为
    // }).then(res => res.json());
    // await dbConnect();
    
    console.log('data >>>', data)
    // debugger;
    // let dataUser = await modelUser.exists({ userId, email });
    // console.log('dataUser', dataUser)
    // const res = await fetch(`${urlDomainUser}?collectionName=user&userId=${session?.user?.userId}&email=${session?.user?.email}`, {
    //     method: 'PUT',
    //     headers: {
    //         "Content-type": 'application/json'
    //     },
    //     // body: JSON.stringify({ userId: , email:  })
    // })
    // const dataRes = await res.json();
    // console.log('dataRes', dataRes)
    // debugger;
    // if (dataRes.success) {
    //     console.log(dataRes.message)
    //     // window.location.reload()
    // } else {
    //     throw new Error('Failed to find an item.')
    // }
    /* /wtest user */
}