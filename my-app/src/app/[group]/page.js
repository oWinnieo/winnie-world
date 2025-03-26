import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { listNavItemConfig } from '@/constants/formConfig'
import { titleDisplay } from '@/lib/utils';
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { ItemListNav } from '@/app/components/item/itemListNav/itemListNav'
import { getSession } from '../../../pages/api/getSession'
import '../../../styles/components/list.scss'

const getListData = async (params) => {
    try {
        const { data, success, skipNum, limitNum } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&group=${params.group}`, {
            cache: 'no-store'
        }).then(res => res.json())
        const dataNew = data.map(item => (
            {
                ...item,
                isEditItem: false
            }
        ))
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
    /* wtest auth mock */
    const session = await getSession() // wtest auth mock
    /* /wtest auth mock */
    const { group } = await params

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
                <>
                <ItemEditor
                    params={
                    {
                        group,
                        urlDomain,
                        collectionName: 'listNav',
                        formConfig: listNavItemConfig,
                    }
                    }
                    session={session}
                ></ItemEditor>
                </>
            }
            <ul className="ul-list-nav">
                {
                    listLearningFromApi?.length > 0 ?
                    listLearningFromApi.map((item, index) => (
                        <ItemListNav
                            key={index}
                            item={item}
                            urlDomain={urlDomain}
                            session={session}
                        ></ItemListNav>
                    )) :
                    <li>no data</li>
                }
            </ul>
        </PageWrap>
    )
}