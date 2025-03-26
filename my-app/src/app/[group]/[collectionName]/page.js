import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import {
  collectionNameForLearning as colLearning,
  collectionNameManagement as colManagement,
  collectionNameForListNavGroup as colListNavGroup
} from '@/constants/collectionName'; // wtest mock
import { titleDisplay } from '@/lib/utils';
import { learningItemConfig } from '@/constants/formConfig'
import { ListOfCollection } from '@/app/components/list/listOfCollection/listOfCollection';
import { htmlDecodeSlice, html2txt, strSliced } from '@/lib/utils';
import { getSession } from '../../../../pages/api/getSession'
// import { notFound } from 'next/navigation' // wtest notfound

const getListData = async (params) => {
    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    const dataNew = data && data.length > 0 ? data.map(item => {
        const itemNew = colLearning.includes(params.collectionName) ? {
            ...item,
            contentSliced: strSliced(html2txt(item.content), 200)
        } : (
            params.collectionName === 'user' ? {
                ...item,
                isEditItem: false
            } : item
        )
        return itemNew
    }) : []
    return dataNew
}

export default async function LearningArea ({ params }) {
  /* wtest auth mock */
  const session = await getSession() // wtest auth mock
  /* /wtest auth mock */
    const { collectionName, group } = await params
    const ifGroupOK = () => {
      return colListNavGroup.includes(group)
    }
    const ifGroupColNameMatch = () => {
      return group === 'learning' && colLearning.includes(collectionName) ||
      group === 'management' && colManagement.includes(collectionName)
    }
    if (!ifGroupOK() || !ifGroupColNameMatch()) {
      return <div>notFound</div>
      // wtest notfoundnotFound()
    }

    const setGroup = () => {
      if (colLearning.includes(collectionName)) {
        return 'learning'
      } else if (colManagement.includes(collectionName)) {
        return 'management'
      } else { // wtest
        return 'management'
      }
    }
    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    /* wtest list fetch */
    const listData = await getListData({
      urlDomain,
      collectionName
    });
    /* /wtest list fetch */
    return (
        <>
            <PageWrap>
                <AreaTitle>{titleDisplay({ name: collectionName, suffix:  setGroup() })}</AreaTitle>
                {<ListOfCollection
                  urlDomain={urlDomain}
                  group={setGroup()}
                  collectionName={collectionName}
                  learningItemConfig={learningItemConfig}
                  listData={listData}
                  session={session}
                ></ListOfCollection>}
            </PageWrap>
        </>
    )
}

// wtest DYNAMIC_SERVER_USAGE
// export async function generateStaticParams() {
//   const colLearningMapped = colLearning.map(item => ({
//     collectionName: item
//   }))
//   return colLearningMapped
// }
