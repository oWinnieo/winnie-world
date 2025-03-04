import { PageWrap } from "@/app/components/pageWrap/pageWrap";
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'

export default function LearningServerDeployment () {
    const urlDomain = process.env.URL_DOMAIN + '/api/learning-item' // wtest ?collectionName=server
    return (
        <>
            <PageWrap>
                <AreaTitle>Server Deployment Learning</AreaTitle>
                <ItemEditor
                    params={
                        {
                            urlDomain,
                            collectionName: 'server'
                        }
                    }
                ></ItemEditor>
                <LearningItemList
                    params={
                        {
                            urlDomain,
                            collectionName: 'server'
                        }
                    }
                ></LearningItemList>
            </PageWrap>
        </>
    )
}