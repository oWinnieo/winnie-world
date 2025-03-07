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
  let modelTarget
  switch (collectionName) {
    case 'english':
      modelTarget = modelEn
      break;
    case 'japanese':
      modelTarget = modelJp
      break;
    case 'server':
      modelTarget = modelServer
      break;
  }
  // console.log('handler wtest ~~~~~~~~~~~~', collectionName, req.body)
  debugger;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // if (req.id) {
        //   const learningOneItem = await LearningItem.findOne({ _id: req.id })
        //   res.status(200).json({ success: true, data: {a: 'aha'}})
        // } else {
          let learningItems
            learningItems = await modelTarget.find({}).sort({ createdAt: -1 }) // 获取所有item
          res.status(200).json({ success: true, data: learningItems });
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
        // const learningItem = await modelTarget.create(req.body); // 创建item
        debugger;
        let learningItem
          learningItem = await modelTarget.create(req.body);
        res.status(200).json({ success: true, data: learningItem });
      } catch (err) {
        console.log('wtest err >>>', err)
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT': // edit
      try {
        const { id, ...updateData } = req.body; // 获取 id 和要更新的数据
        if (!id) {
          return res.status(400).json({ success: false, message: "ID is required" });
        }
        let updatedItem
          updatedItem = await modelTarget.findByIdAndUpdate(id, updateData, {
            new: true, // 返回更新后的数据
            runValidators: true, // 运行 Mongoose 校验
            // timestamps: true, // ✅ 确保 `updatedAt` 也会更新
          });
        if (!updatedItem) {
          return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: updatedItem });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body; // 前端需要在 body 里传 id
        if (!id) {
          return res.status(400).json({ success: false, error: 'Missing ID' });
        }
        let deletedItem
          deletedItem = await modelTarget.deleteOne({ _id: id });
        if (deletedItem.deletedCount === 0) {
          return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
      break;
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


// case 'POST': // wtest issue 有的时候可以有的时候不行,为什么??? 因为之前content设置了unique
// try {
//   console.log('wtest collectionName <><><>', collectionName)
//   let learningItem
//     learningItem = await modelTarget.create(req.body);
//   res.status(200).json({ success: true, data: learningItem });
// } catch (err) {
//   res.status(400).json({ success: false });
// }
// break;