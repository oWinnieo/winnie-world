import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import Link from 'next/link'
import dbConnect from '../../../../lib/db';
import { modelEn,
  modelJp,
  modelServer
} from '../../../../models/learningItem';

import { timeFormatter } from '../../../../lib/util'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import './style.scss'

const getOneData = async (params) => {
  // console.log('wtest_d', wtest_d)
  const { data } = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}&fetchType=one&id=${params.id}`, {
      cache: 'no-store', // 等效于 SSR 的行为
      }).then(res => res.json());
  return data
}

export default async function Post({ params }) {
  const paramsArr = await params
  const slug = paramsArr.slug
  const urlDomainLearning = `${process.env.URL_DOMAIN}/api/learning` // wtest 
  const data = await getOneData({
    urlDomainLearning,
    collectionName: slug[0],
    id: slug[1]
  });
  console.log('data post wtest >>>>>>>', data)

  return (
    <PageWrap>
      {data && <>
        <AreaTitle>
        <h2>{data.title}</h2>
      </AreaTitle>
      <div className="area-info">
          <div><Link href={slug[0] ? `/learning/${slug[0]}` : '/learning'}>Back to List</Link></div>
          <p>Created Time: {timeFormatter(data.createdAt)} </p>
          <p>Updated Time: {timeFormatter(data.updatedAt)} </p>
          <p>Author: {data?.author?.name ? data.author.name : '??'}</p>
          {/* data?.authorId */}
          <p>wtest: {JSON.stringify(data?.author?.userId ? data.author.userId : '??')}</p>
      </div>
      <div className="page-details">
        {/* <p>wtest data: {JSON.stringify(data)}</p> */}
        <ItemEditor
            params={
            {
              urlDomainLearning,
                data: {
                    title: data.title,
                    author: data.author,
                    // content: data.content, // wtest
                    content: data.content, // wtest htmlSimpleDecode(data.content),
                    id: slug[1],
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                },
                collectionName: slug[0]
            }
            }
        ></ItemEditor>
      </div>
      {/* <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Post Page</h1>
        <p className="mt-4 text-gray-600">Slug Parameters:</p>
        <pre className="bg-gray-100 p-4 rounded-md mt-2">{JSON.stringify(slug, null, 2)}</pre>
      </div> */}
      </>}
      
    </PageWrap>
  );
}

// export async function generateStaticParams() {
//   return [
//     { slug: ["learning", "japanese", "123"] },
//     { slug: ["learning", "english", "456"] },
//   ];
// }