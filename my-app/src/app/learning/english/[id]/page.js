// export const dynamic = "force-dynamic";

// export default function ProductPage({ params }) {
//     return <div>Dynamic Product ID: {params.id}</div>;
// }

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const dbName = 'mydatabase';
// const collectionName = 'mycollection';
 
// MongoClient.connect(url, function(err, client) {
//   if(err) throw err;
  
//   const db = client.db(dbName);
//   const collection = db.collection(collectionName);
  
//   // 获取单条数据
//   collection.findOne({ myField: 'myValue' }, function(err, document) {
//     if(err) throw err;
    
//     console.log(document); // 输出匹配条件的文档
//     client.close(); // 关闭连接
//   });
// });
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import Link from 'next/link'
import dbConnect from '../../../../../lib/db';
import LearningItem from '../../../../../models/learningItem';
import { timeFormatter } from '../../../../../lib/util'
import './style.scss'


export default async function Post ({ params }) {
    const { id } = await params

    await dbConnect();
    console.log('?1')
    const data = await LearningItem.findOne({ _id: id });
    console.log('?2')
    console.log(data);

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
                <h2>{data.title}</h2>
            </AreaTitle>
            <div><Link href="/learning/english">Back to List</Link></div>
            <div className="page-details">
                {/* <h1>Post of English Learning: id, {id}</h1> */}
                
                <p>Created Time: {timeFormatter(data.createdAt)} </p>
                <p>{data.content}</p>
                
                {/* <div>{JSON.stringify(data)}</div> */}
                {/* <div>{JSON.stringify(params)}</div>  */}
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