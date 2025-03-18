import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { tipsConst } from '@/constants/tipsConst'
import Link from 'next/link'
import dbConnect from '../../../../lib/db';
import { modelEn,
  modelJp,
  modelServer
} from '../../../../models/learningItem';

import { timeFormatter } from '@/lib/utils'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
// import { notFound } from 'next/navigation' // wtest notfound
import { collectionNameForLearning as colLearning, collectionNameManagement as colManagement } from '@/constants/collectionName' // wtest mock
import { learningItemConfig } from '@/constants/formConfig'
import { getSession } from '../../../../pages/api/getSession'
import './style.scss'

const getOneItem = async (params) => {
  const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=one&id=${params.id}`, {
      cache: 'no-store', // 等效于 SSR 的行为
      credentials: "include"
      }).then(res => res.json());
      console.log('aha data', data)
  return data
}
const getListData = async (params) => {
  const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&belongToItemCollection=${params.belongToItemCollection}&belongToItemId=${params.belongToItemId}`, {
    cache: 'no-store',
    credentials: "include"
  }).then(res => res.json())
  // console.log('data', data)
  return data
}

export default async function Post({ params }) {
  /* wtest auth mock */
  const session = await getSession() // wtest auth mock
  console.log('session in area page ------>>> 123', session)
  /* /wtest auth mock */
  const paramsArr = await params
  const slug = paramsArr.slug
  if (slug.length !== 2 || !colLearning.includes(slug[0])) {
    return <div>notFound</div>
    // // wtest notfound notFound()
  }

  const urlDomain = `${process.env.URL_DOMAIN}/api/learning`
  const data = await getOneItem({
    urlDomain,
    collectionName: slug[0],
    id: slug[1]
  });
  // console.log('data post wtest >>>>>>>', data) // wtest here 250318 why undefined
  const comments = await getListData({
    urlDomain,
    collectionName: 'comment',
    belongToItemCollection: slug[0],
    belongToItemId: slug[1]
  })
  // console.log('comments >>>>>>>>>>>>>>>>>>>...', comments)

  return (
    <PageWrap>
      {data ?
        <>
          <AreaTitle>
            <h2>{data.title}</h2>
          </AreaTitle>
          <div className="area-info">
              <div><Link href={slug[0] ? `/learning/${slug[0]}` : '/learning'}>Back to List</Link></div>
              <p>Created Time: {timeFormatter(data.createdAt)} </p>
              <p>Updated Time: {timeFormatter(data.updatedAt)} </p>
              <div className="author-info">
                <p>Author: {data?.authorInfo?.name ? data.authorInfo.name : '??'}</p>
                {data?.authorInfo?.image &&
                  // <img className="auth-avatar" src={data.authorInfo.image} alt="User Avatar" />
                  <AvatarOfUser
                      srcImage={data.authorInfo.image}
                  ></AvatarOfUser>
                }
              </div>
          </div>
          <div className="page-details">
            {/* <p>wtest data: {JSON.stringify(data)}</p> */}
            <ItemEditor
                params={
                  {
                    group: 'learning',
                    urlDomain,
                    collectionName: slug[0],
                    formConfig: learningItemConfig,
                    data: {
                      title: data.title,
                      authorInfo: data.authorInfo,
                      content: data.content,
                      id: slug[1],
                      createdAt: data.createdAt,
                      updatedAt: data.updatedAt,
                      comments: comments, // wtest,
                      like: data.like,
                      favorite: data.favorite,
                      likeStatus: data.likeStatus,
                      favoriteStatus: data.favoriteStatus
                    },
                  }
                }
                session={session}
            ></ItemEditor>
          </div>
      {/* <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Post Page</h1>
        <p className="mt-4 text-gray-600">Slug Parameters:</p>
        <pre className="bg-gray-100 p-4 rounded-md mt-2">{JSON.stringify(slug, null, 2)}</pre>
      </div> */}
      </> : <p>{tipsConst.tipDataWrong}</p>}
      
    </PageWrap>
  );
}
