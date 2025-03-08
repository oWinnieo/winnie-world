import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'

export default async function LearningArea ({ params }) {
    const { collectionName } = await params
    const urlDomainLearning = process.env.URL_DOMAIN + '/api/learning'
    const urlDomainUser = process.env.URL_DOMAIN + '/api/learning' // wtest users / learning
    return (
        <>
            <PageWrap>
                <AreaTitle>{collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Learning</AreaTitle>
                <ItemEditor
              params={
                {
                  urlDomainLearning,
                  urlDomainUser,
                  collectionName
                }
              }
            ></ItemEditor>
            <LearningItemList
              params={
                {
                  urlDomainLearning,
                  urlDomainUser,
                  collectionName
                }
              }
            ></LearningItemList>
            </PageWrap>
        </>
    )
}
