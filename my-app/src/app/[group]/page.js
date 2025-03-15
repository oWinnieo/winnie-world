import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { listNavItemConfig } from '@/constants/formConfig'
import { titleDisplay } from '@/lib/utils';
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import { ItemListNav } from '@components/itemListNav/itemListNav'
import { useGlobal } from "@/app/contexts/GlobalContext";
import { userInfoHandlerAfterLogin } from '../../../pages/api/auth/userInfoHandler' // wtest
import { userInfo } from '@/constants/userInfo' // wtest mock

import Link from 'next/link'
import '../../../styles/components/list.scss'

const getListData = async (params) => { // wtest waiting
    // console.log('params', params)
    // const { AB, ABC } = useGlobal()
    try {
        const { data, success, skipNum, limitNum } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&group=${params.group}`, {
            cache: 'no-store'
        }).then(res => res.json())
        // console.log('data', data)
        const dataNew = data.map(item => (
            {
                ...item,
                isEditItem: false
            }
        ))
        // console.log('dataNew ======== group page', dataNew)
        if (success) {
            console.log(success)
            return dataNew
        } else {
            throw new Error('Failed to create an item.')
        }
    } catch (err) {
        console.log(err)
    }
}

export default async function Area ({ params }) {
    const { group } = await params
    /* wtest userInfo handler *
    const session = {
        user: userInfo
    }
    const resUserInfo = await userInfoHandlerAfterLogin({ user: session.user })
    console.log('resUserInfo', resUserInfo)
    /* /wtest userInfo handler */
    
    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    const listLearningFromApi = await getListData({
        group,
        urlDomain,
        collectionName: 'listNav'
    })

    return (
        <PageWrap>
            <AreaTitle>{titleDisplay({ name: group,  suffix: 'area' })}</AreaTitle>
            {
                group === 'management' &&
                <ItemEditor
                    params={
                    {
                        group,
                        urlDomain,
                        collectionName: 'listNav', // wtest 'listNav',
                        formConfig: listNavItemConfig, // wtest learningItemConfig // wtest listNavItemConfig,
                    }
                    }
                ></ItemEditor>
            }
            <ul className="ul-list-nav">
                {
                    listLearningFromApi?.length > 0 ?
                    listLearningFromApi.map((item, index) => (
                        <ItemListNav
                            key={index}
                            item={item}
                            urlDomain={urlDomain}
                        ></ItemListNav>
                    )) :
                    <li>no data</li>
                }
            </ul>
        </PageWrap>
    )
}