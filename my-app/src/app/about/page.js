import { PageWrap } from '@components/pageWrap/pageWrap'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { introConfig } from '@/constants/formConfig'
import { getSession } from '../../../pages/api/getSession'

import { getOneItem, getListDataOfItems } from '@/lib/getData'

export default async function About ({ params }) {
    
    /* wtest auth mock */
    const session = await getSession() // wtest auth mock
    /* /wtest auth mock */
    const urlDomain = `${process.env.URL_DOMAIN}/api/learning`
    // const data = await getOneItem({
    //     urlDomain,
    //     collectionName: 'intro',
    //     // id: slug[1],
    //     sessionUserId: session?.user?.userId
    //   });
      
    const {
        dataNew: listIntro,
        totalItems,
        totalPages,
        currentPage
    } = await getListDataOfItems({
        urlDomain,
        collectionName: 'intro'
    })
    return (
        <>
            <PageWrap>
                <div>
                    <h1>About Me</h1>
                    <div className="page-details">
                        <ItemEditor
                            params={
                                {
                                group: 'management',
                                urlDomain,
                                collectionName: 'intro',
                                formConfig: introConfig,
                                data: listIntro[0],
                                }
                            }
                            session={session}
                        ></ItemEditor>
                    </div>
                </div>
            </PageWrap>
        </>
    )
}