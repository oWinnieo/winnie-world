import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import { ModTest } from '@/app/components/forTesting/modTest' // wtest modTest
import { collectionName as colNameMock } from '../../mock/collectionName'; // wtest mock


export default async function LearningArea ({ params }) {
    const { collectionName } = await params
    const urlDomainLearning = process.env.URL_DOMAIN + '/api/learning'
    // const urlDomainUser = process.env.URL_DOMAIN + '/api/learning' // wtest users / learning
    /* wtest *
    console.log('colNameMock', colNameMock)
    const colNameMockMapped = colNameMock.map(item => ({
      collectionName: item
    }))
    console.log('colNameMockMapped', colNameMockMapped)
    /* /wtest */
    const titleDisplay = () => {
      let titleRes = ''
      const titleFormat = collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
      if (colNameMock.includes(collectionName)) {
        titleRes = `${titleFormat} Learning`
      } else {
        titleRes = 'User Management'
      }
      return titleRes
    }
    return (
        <>
            <PageWrap>
                <AreaTitle>{titleDisplay()}</AreaTitle>
                {
                  collectionName === 'user' ?
                  <ModTest></ModTest> : null
                }
                <ItemEditor
                  params={
                    {
                      urlDomainLearning,
                      // urlDomainUser,
                      collectionName
                    }
                  }
                ></ItemEditor>
                <LearningItemList
                  params={
                    {
                      urlDomainLearning,
                      // urlDomainUser,
                      collectionName
                    }
                  }
                ></LearningItemList>
            </PageWrap>
        </>
    )
}


export async function generateStaticParams() {
  const colNameMockMapped = colNameMock.map(item => ({
    collectionName: item
  }))
  return colNameMockMapped
}
