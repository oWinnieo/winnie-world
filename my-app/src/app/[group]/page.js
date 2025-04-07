import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { listNavItemConfig } from '@/constants/formConfig'
import { titleDisplay } from '@/lib/utils';
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { ItemListNav } from '@/app/components/item/itemListNav/itemListNav'
import { getSession } from '../../../pages/api/getSession'
import {
    collectionNameForListNavGroup as colListNavGroup
  } from '@/constants/collectionName';
import { getListDataOfNav } from '@/lib/getData'
import { notFound } from 'next/navigation' // wtest notfound
import '../../../styles/components/list.scss'

export default async function Area ({ params }) {
    /* wtest auth mock */
    const session = await getSession() // wtest auth mock
    /* /wtest auth mock */
    const { group } = await params
    const ifGroupOK = () => {
        return colListNavGroup.includes(group)
    }
    if (!ifGroupOK()) {
        return notFound()
    }

    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    const listLearningFromApi = await getListDataOfNav({
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