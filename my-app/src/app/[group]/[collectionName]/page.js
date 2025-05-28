import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import {
  collectionNameForManagement as colManagement,
  collectionNameForListNavGroup as colListNavGroup
} from '@/constants/collectionName';
import { titleDisplay } from '@/lib/utils';
import { learningItemConfig } from '@/constants/formConfig'
import { ListOfCollection } from '@/app/components/list/listOfCollection/listOfCollection';
import { getSession } from '../../../../pages/api/getSession'
import { getListDataOfItems, getColLearning } from '@/lib/getData' // wtest page getListDataOfItems
import { notFound } from 'next/navigation' // wtest notfound
import { CounterPage } from '@/app/components/forTesting/redux' // wtest
// import { Pagination } from '@/app/components/pagination/pagination' // wtest page

export default async function LearningArea ({ params }) {
  
  /* wtest auth mock */
  const session = await getSession() // wtest auth mock
  /* /wtest auth mock */
    const { collectionName, group } = await params
    const urlDomain = process.env.URL_DOMAIN + '/api/learning'
    const ifGroupOK = () => {
      return colListNavGroup.includes(group)
    }
    const colLearning = await getColLearning({
      group,
      urlDomain,
      collectionName: 'listNav'
    })

    const ifGroupColNameMatch = () => {
      console.log('colListNavGroup 1', colListNavGroup)
      return group === 'learning' && colLearning.includes(collectionName) ||
      group === 'management' && colManagement.includes(collectionName) ||
      group === 'testing'
    }
    if (!ifGroupOK() || !ifGroupColNameMatch()) {
      return notFound()
      // wtest <div>notFound</div>
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
    /* wtest list fetch *
    const listData = await getListDataOfItems({
      urlDomain,
      collectionName,
      group
    });
    /* /wtest list fetch */
    return (
        <>
          {group !== 'testing' ?
              <PageWrap>
              <AreaTitle>{titleDisplay({ name: collectionName, suffix:  setGroup() })}</AreaTitle>
              {<ListOfCollection
                urlDomain={urlDomain}
                group={setGroup()}
                collectionName={collectionName}
                learningItemConfig={learningItemConfig}
                // listData={listData} // wtest page
                session={session}
              ></ListOfCollection>}
          </PageWrap>
          :
          <>
            <CounterPage></CounterPage>
          </>}
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
