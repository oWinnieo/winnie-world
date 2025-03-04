import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import Link from 'next/link'
import dbConnect from '../../../../../lib/db';
import { modelEn,
    modelJp,
    modelServer,
    LearningItem
  } from '../../../../../models/learningItem'; // wtest LearningItem
import { timeFormatter } from '../../../../../lib/util'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import './style.scss'


export default async function Post ({ params }) {
    const { id } = await params

    await dbConnect();
    const data = await modelEn.findOne({ _id: id }).lean();
    const urlDomain = process.env.URL_DOMAIN + '/api/learning-item' // wtest ?collectionName=english
    console.log('data', data)

    // const timeFormatter = (time) => {
    //     const timeOri = new Date(time)
    //     const timeFormatted = timeOri.toLocaleString('zh-CN', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minite: '2-digit'
    //     })
    //     return timeFormatted
    // }
    
    // const findOne = async () => {
    //     console.log('id', id)
    //     try {
          
    //       return data
    //     } catch (error) {
    //       console.log(error.message);
    //       process.exit(1);
    //     }
    //   };
    //   let resDetails = findOne();
    // 
    // // try {
    //     const { data } = await fetch('https://localhost:3000/api/learning-item', {
    //         method: 'GET',
    //         // headers: {
    //         //     "Content-type": 'application/json'
    //         // },
    //         // body: JSON.stringify({ id })
    //     })
    //     // resOne = res
    // // } catch (err) {
    // //     console.log(err)
    // // }
    // const { data } = await fetch('https://localhost:3000/api/learning-item', {
    //     cache: 'no-store', // 等效于 SSR 的行为
    //     method: 'GET',
    //     id: id
    // }).then(res => res.json());
    return (
        <PageWrap>
            <AreaTitle>
                {/* <h2>{data.title}</h2> */}
            </AreaTitle>
            <div className="area-info">
                <div><Link href="/learning/english">Back to List</Link></div>
                {/* <p>Created Time: {timeFormatter(data.createdAt)} </p>
                <p>Updated Time: {timeFormatter(data.updatedAt)} </p> */}
                {/* <p>wtest: {JSON.stringify(data.updatedAt)}</p> */}
            </div>
            
            <div className="page-details">
                {/* <h1>Post of English Learning: id, {id}</h1> */}
                {/* <ItemEditor
                    params={
                    {
                        urlDomain,
                        data: {
                            title: data.title,
                            // content: data.content, // wtest
                            content: data.content, // wtest htmlSimpleDecode(data.content),
                            id: data.id,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt
                        },
                        collectionName: 'english'
                    }
                    }
                ></ItemEditor> */}
            </div>
        </PageWrap>
            
    )
}

// // app/products/[id]/page.js
// export async function generateStaticParams() {
//     // 模拟从 API 获取所有产品 ID
//     const products = await fetch('https://api.example.com/products').then((res) => res.json());

//     // 返回静态参数列表
//     return products.map((product) => ({
//         id: product.id.toString(),
//     }));
// }

// export default function ProductPage({ params }) {
//     return <div>Product ID: {params.id}</div>;
// }

/* *


/**/