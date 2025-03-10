import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { userFromGoogle } from '../mock/userInfo' // wtest user handler
import { userInfoHandler, userCheckedHandler, userInfoHandlerAfterLogin } from '../../../pages/api/auth/userInfoHandler' // wtest user handler
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
    // console.log('listLearningFromApi', listLearningFromApi)
    // console.log('userFromGoogle', userFromGoogle)
    /* wtest userInfo handler *
    console.log('wait for >>> userInfoHandlerAfterLogin <<<')
    const resUserInfo = await userInfoHandlerAfterLogin({ user: userFromGoogle })
    console.log('resUserInfo', resUserInfo)
    /* /wtest userInfo handler */
        /* wtest ga *
        
        const resV = await fetch(process.env.URL_DOMAIN + '/api/visitors', {
            cache: 'no-store',
        }).then(res => res.json());
        console.log('resV', resV)
        /* /wtest ga */
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