
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { collectionNameForLearning as colLearning, collectionNameManagement as colManagement } from '@/constants/collectionName'; // wtest mock
import { titleDisplay } from '@/lib/utils';
import { learningItemConfig } from '@/constants/formConfig'
import { ListOfCollection } from '@/app/components/listOfCollection/listOfCollection';
import { notFound } from 'next/navigation'


export default async function LearningArea ({ params }) {
  // const { group, collectionName } = useParams()
    const { collectionName } = await params
    // console.log('group', group, 'collectionName', collectionName)
    // console.log('collectionName ---------->', collectionName)
    const ifNotLearnOrNotManage = () => {
      return !colLearning.includes(collectionName) && !colManagement.includes(collectionName)
    }
    // const ifManageAndNotAdmin = () => {
    //   return colManagement.includes(collectionName)
    // }
    if (ifNotLearnOrNotManage()) { // wtest
      return notFound()
    }
    // const setSuffix = () => {
    //   if (colLearning.includes(collectionName)) {
    //     return 'learning'
    //   } else if (colManagement.includes(collectionName)) {
    //     return 'management'
    //   }
    // }
    const group = () => {
      if (colLearning.includes(collectionName)) {
        return 'learning'
      } else if (colManagement.includes(collectionName)) {
        return 'management'
      }
    }
    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    return (
        <>
            <PageWrap>
                <AreaTitle>{titleDisplay({ name: collectionName, suffix:  group() })}</AreaTitle>
                <ListOfCollection
                  urlDomain={urlDomain}
                  group={group()}
                  collectionName={collectionName}
                  learningItemConfig={learningItemConfig}
                ></ListOfCollection>
            </PageWrap>
        </>
    )
}


export async function generateStaticParams() {
  const colLearningMapped = colLearning.map(item => ({
    collectionName: item
  }))
  return colLearningMapped
}
