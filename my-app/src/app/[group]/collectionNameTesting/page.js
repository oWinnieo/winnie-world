import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { titleDisplay } from '@/lib/utils';
import { collectionNameManagement as colManagement } from '@/constants/collectionName'
import { ModTest } from '@/app/components/forTesting/modTest' // wtest modTest
import { notFound } from 'next/navigation'
export default async function ManagementArea ({ params }) {
    const { collectionName } = await params
    if (!colManagement.includes(collectionName)) {
        return notFound()
    }
    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    return (
        <>
            <PageWrap>
                <AreaTitle>{titleDisplay({ colName: collectionName, scope: colManagement, group: 'management' })}</AreaTitle>
                <ModTest></ModTest>
                <LearningItemList
                    params={
                    {
                        urlDomain,
                        collectionName
                    }
                    }
                ></LearningItemList>
            </PageWrap>
        </>
    )
}
titleDisplay