// import dbConnect from '@/lib/db';
// import LearningItem from '@/models/learning-item'
// import { NextResponse } from 'next/server';
// export async function POST (req) {
//     const { title, content } = await req.json()
//     await dbConnect();
//     await LearningItem.create({ title, content })
//     return NextResponse.json({ message: 'Learning Item Created!'}, { status: 201 })
// }

import dbConnect from '../../lib/db';
import { modelEn,
  modelJp,
  modelServer,
  LearningItem
} from '../../models/learningItem'; // wtest LearningItem

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName } = req.query
  let modalTarget
  switch (collectionName) {
    case 'english':
      modalTarget = modelEn
      break;
    case 'japanese':
      modalTarget = modelJp
      break;
    case 'server':
      modalTarget = modelServer
      break;
  }
  // console.log('handler wtest ~~~~~~~~~~~~', collectionName, req.body)
  debugger;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // if (req.id) {
        //   console.log('1')
        //   const learningOneItem = await LearningItem.findOne({ _id: req.id })
        //   res.status(200).json({ success: true, data: {a: 'aha'}})
        // } else {
          // console.log('get ~~~ wtest', collectionName)
          let learningItems
          // if (collectionName === 'english') {
            // console.log('handler wtest ~~~~~~~~~~~~', collectionName)
            learningItems = await modalTarget.find({}).sort({ createdAt: -1 }) // 获取所有item
          // } else if (collectionName === 'japanese') {
          //   console.log('handler wtest ~~~~~~~~~~~~', collectionName)
          //   learningItems = await modelJp.find({}).sort({ createdAt: -1 }) // 获取所有item
          // } else if (collectionName === 'server') {
          //   console.log('handler wtest ~~~~~~~~~~~~', collectionName)
          //   learningItems = await modelServer.find({}).sort({ createdAt: -1 }) // 获取所有item
          // }
          // learningItems = await modelEn.find({}).sort({ createdAt: -1 }) // 获取所有item
          console.log('learningItems', learningItems)
          res.status(200).json({ success: true, data: learningItems });
          // res.status(200).json({ aha: '11', wtest: '22'})
        // }
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    // case 'GETONE':
    //   try {
    //     // 
    //     // res.status(200).json({ success: true, data: learningOneItem })
    //     const learningItems = await LearningItem.find({}); // 获取所有item
    //     res.status(200).json({ success: true, data: learningItems });
    //   } catch (err) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    case 'POST': // wtest here有的时候可以有的时候不行,为什么???
      try {
        // console.log('handler wtest ~~~~~~~~~~~~ 123', collectionName, id)
        console.log('wtest collectionName <><><>', collectionName, req.body)
        // const learningItem = await modalTarget.create(req.body); // 创建item
        debugger;
        let learningItem
          // if (collectionName === 'english') {
          //   console.log('handler wtest ~~~~~~~~~~~~', collectionName)
          //   learningItem = await modalEn.create(req.body);
          // } else if (collectionName === 'japanese') {
          //   console.log('handler wtest ~~~~~~~~~~~~', collectionName)
          //   learningItem = await modelJp.create(req.body);
          // } else if (collectionName === 'server') {
          //   console.log('handler wtest ~~~~~~~~~~~~', collectionName)
          //   learningItem = await modelServer.create(req.body);
          // }
          learningItem = await modalTarget.create(req.body);
        res.status(200).json({ success: true, data: learningItem });
      } catch (err) {
        console.log('wtest err >>>', err)
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT': // 编辑 item
      try {
        const { id, ...updateData } = req.body; // 获取 id 和要更新的数据
        if (!id) {
          return res.status(400).json({ success: false, message: "ID is required" });
        }
        let updatedItem
        // if (collectionName === 'english') {
          updatedItem = await modalTarget.findByIdAndUpdate(id, updateData, {
            new: true, // 返回更新后的数据
            runValidators: true, // 运行 Mongoose 校验
            // timestamps: true, // ✅ 确保 `updatedAt` 也会更新
          });
        // } else if (collectionName === 'japanese') {
        //   updatedItem = await modelJp.findByIdAndUpdate(id, updateData, {
        //     new: true, // 返回更新后的数据
        //     runValidators: true, // 运行 Mongoose 校验
        //     // timestamps: true, // ✅ 确保 `updatedAt` 也会更新
        //   });
        // } else if (collectionName === 'server') {
        //   updatedItem = await modelServer.findByIdAndUpdate(id, updateData, {
        //     new: true, // 返回更新后的数据
        //     runValidators: true, // 运行 Mongoose 校验
        //     // timestamps: true, // ✅ 确保 `updatedAt` 也会更新
        //   });
        // }
        if (!updatedItem) {
          return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: updatedItem });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;
    /* wtest 1 */
    case 'DELETE':
      try {
        const { id } = req.body; // 前端需要在 body 里传 id
        if (!id) {
          return res.status(400).json({ success: false, error: 'Missing ID' });
        }
        let deletedItem
        // if (collectionName === 'english') {
          deletedItem = await modalTarget.deleteOne({ _id: id });
        // } else if (collectionName === 'japanese') {
        //   deletedItem = await modelJp.deleteOne({ _id: id });
        // } else if (collectionName === 'server') {
        //   deletedItem = await modelServer.deleteOne({ _id: id });
        // }
        // const deletedItem = await LearningItem.deleteOne({ _id: id });

        if (deletedItem.deletedCount === 0) {
          return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
      break;
    /* /wtest 1 */
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  // res.status(200).json({ success: true, data: [{ title: '1t', content: '1c'}] });
}












// Request URL:
// http://localhost:3000/api/learning-item?collectionName=english
// Request Method:
// PUT
// Status Code:
// 400 Bad Request
// Remote Address:
// [::1]:3000
// Referrer Policy:
// strict-origin-when-cross-origin

// Request URL:
// http://localhost:3000/api/learning-item?collectionName=english
// Request Method:
// POST
// Status Code:
// 201 Created
// Remote Address:
// [::1]:3000
// Referrer Policy:
// strict-origin-when-cross-origin

// http://localhost:3000/api/learning-item?collectionName=english
// http://localhost:3000/api/learning-item?collectionName=english


// case 'POST': // wtest here有的时候可以有的时候不行,为什么???
// try {
//   console.log('wtest collectionName <><><>', collectionName)
//   let learningItem
//     learningItem = await modalTarget.create(req.body);
//   res.status(200).json({ success: true, data: learningItem });
// } catch (err) {
//   res.status(400).json({ success: false });
// }
// break;
// case 'PUT':
// try {
//   const { id, ...updateData } = req.body; // 获取 id 和要更新的数据
//   console.log('handler wtest ~~~~~~~~~~~~ 123', collectionName, id)
//   if (!id) {
//     return res.status(400).json({ success: false, message: "ID is required" });
//   }
//   let updatedItem
//   // if (collectionName === 'english') {
//     updatedItem = await modalTarget.findByIdAndUpdate(id, updateData, {
//       new: true, // 返回更新后的数据
//       runValidators: true, // 运行 Mongoose 校验
//     });
//   if (!updatedItem) {
//     return res.status(404).json({ success: false, message: "Item not found" });
//   }

//   res.status(200).json({ success: true, data: updatedItem });
// } catch (err) {
//   res.status(400).json({ success: false, message: err.message });
// }
// break;