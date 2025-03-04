import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import Link from 'next/link'
export default function LearningJapanese () {
    const urlDomain = process.env.URL_DOMAIN + '/api/learning-item' // wtest ?collectionName=japanese
    return (
        <PageWrap>
            <AreaTitle>Japanese Learning</AreaTitle>
            <ItemEditor
                params={
                    {
                        urlDomain,
                        collectionName: 'japanese'
                    }
                }
            ></ItemEditor>
            <LearningItemList
                params={
                    {
                        urlDomain,
                        collectionName: 'japanese'
                    }
                }
            ></LearningItemList>
        </PageWrap>
    )
}