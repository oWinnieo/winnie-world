import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { userFromGoogle } from '../mock/userInfo' // wtest user handler
import { userInfoHandler, userCheckedHandler } from '../../../pages/api/auth/userInfoHandler' // wtest user handler
import Link from 'next/link'

const getListData = async ({ urlDomainListNav, collectionName }) => {
    const { data } = await fetch(`${urlDomainListNav}?collectionName=${collectionName}`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    const dataNew = data && data.length > 0 ? data.map(item => {
        return {
            ...item,
            contentSliced: html2txt(item.content)
        }
    }) : []
    return dataNew
}

const listLearning = [
    {
        title: 'English',
        link: '/learning/english',
        colName: 'english'
    },
    {
        title: 'Japanese',
        link: '/learning/japanese',
        colName: 'japanese'
    },
    {
        title: 'Server Deployment',
        link: '/learning/server',
        colName: 'server'
    },
    // {
    //     title: 'Coming Soon ...',
    // },
    // {
    //     title: 'Coming Soon ...',
    // }
]

export default async function Learning () {
    const urlDomainListNav = process.env.URL_DOMAIN + '/api/listNav'
    const listLearningFromApi = await getListData({
        urlDomainListNav,
        collectionName: 'listNav'
    })
    console.log('listLearningFromApi', listLearningFromApi)
    // const wtestUserHandle = () => {
        // console.log('wtest aha', userFromGoogle)
        const { success, message, data } = await userInfoHandler({ user: userFromGoogle })
        console.log('data wtest >>>>>>>>> 123123', data)
        // console.log('userFromGoogle', userFromGoogle)
        let resUserHandledRes
        if (data) {

            resUserHandledRes = await userCheckedHandler({ user: {
                ...data,
                ...userFromGoogle
            }, type: 'update' })
        } else {
            resUserHandledRes = await userCheckedHandler({ user: userFromGoogle, type: 'add' })
        }
        console.log('wtest resUserHandledRes', resUserHandledRes)
    // }
    return (
        <PageWrap>
            <AreaTitle>Learning Area</AreaTitle>
            <ul>
                {
                    listLearning.map(item => (
                        item.link
                            ? <li key={item.title}><Link href={item.link}>{item.title}</Link></li>
                            : <li key={item.title}>{item.title}</li>
                    ))
                }
            </ul>
            {/* <button onClick={wtestUserHandle}>user handler wtest</button> */}
        </PageWrap>
    )
}