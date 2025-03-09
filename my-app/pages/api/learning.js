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
import { collectionName as colNameMock } from '../../src/app/mock/collectionName' // wtest mock
import { modelEn,
  modelJp,
  modelServer,
  LearningItem
} from '../../models/learningItem'; // wtest LearningItem
import { modelUser } from '../../models/users';

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName, fetchType, id } = req.query
  // console.log('wtest req.query >>>>>>>>>', req.query)
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
    case 'user':
        modelTarget = modelUser
        break;
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      if (fetchType === 'list') {
        try {
            const learningItems = await modelTarget.find({}).sort({ createdAt: -1 }).lean() // 获取所有item
            if (colNameMock.includes(collectionName)) {
                    const authorIdArr = learningItems.map(item => item.authorId)
                    const userArr = await modelUser.find({
                      userId: { $in: authorIdArr }
                    })
                    const learningItemsWithAuthor = learningItems.map(item => {
                      return {
                        ...item,
                        authorInfo: userArr.find(user => user.userId === item.authorId)
                      }
                    })
                    // const learningItemsWithAuthor = learningItems.map(item => item.toObject())
                    res.status(200).json({ success: true, data: learningItemsWithAuthor });

            } else {
              res.status(200).json({ success: true, data: learningItems });
            }
        } catch (err) {
          res.status(400).json({ success: false });
        }
      } else if (fetchType === 'one') {
        console.log('wtest waiting --------------->', collectionName, fetchType) // wtest modelTarget
        console.log('get list colNameMock', colNameMock) // wtest mock
        if (collectionName === 'user') {
            const { userId, email } = req.query;
            // console.log('collectionName -----------------> 123', collectionName)
            try {
                // 查询是否存在符合条件的条目
                // const userExists = await modelTarget.exists({ userId, email });
                const user = await modelTarget.findOne({ userId, email })
                // const user = await modelTarget.find({})
                // const user = await modelTarget.countDocuments({})
                // console.log('--------->>> userExists ---...', user) // wtest waiting
                // debugger;
                if (user) {
                    res.status(200).json({ success: true, data: user });
                } else {
                    res.status(200).json({ success: false, message: "Item not found" });
                }
            } catch (error) {
                res.status(500).json({ error: '数据库查询出错' });
            }
        } else {
            try {
                const learningItem = await modelTarget.findOne({ _id: id }).lean();
                if (colNameMock.includes(collectionName)) {
                  const user = await modelUser.findOne({ userId: learningItem.authorId })
                  console.log('user >>>>>>>>>>', user)
                  res.status(200).json({ success: true, data: {
                    ...learningItem,
                    authorInfo: user
                  } });
                } else {
                  res.status(200).json({ success: true, data: learningItem });
                }
                // console.log('learningItem', learningItem)
            } catch (err) {
                res.status(400).json({ success: false });
            }
        }
        
      }
      
      break;
    case 'POST': // wtest here有的时候可以有的时候不行,为什么???
      try {
        const learningItem = await modelTarget.create(req.body);
        res.status(200).json({ success: true, data: learningItem });
      } catch (err) {
        res.status(400).json({ success: false });
      }

    //   try {
    //     let userAdded = await modelTarget.create(req.body);
    //     res.status(200).json({ success: true, data: userAdded })
    //   } catch (err) {
    //     res.status(400).json({ success: false })
    //   }
      break;
    case 'PUT': // edit
      try {
        const { ...updateData } = req.body; // 获取 id 和要更新的数据
        const id = req.body._id || req.body.id
        // if (collectionName === 'user') {} else {}
        // console.log('req.body', req.body, 'id', id, 'updateData', updateData, 'collectionName', collectionName)
        if (!id) {
          return res.status(400).json({ success: false, message: "ID is required" }); // wtest here
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
        const id = req.body._id || req.body.id; // 前端需要在 body 里传 id
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

















// case 'POST': // wtest issue 有的时候可以有的时候不行,为什么??? 因为之前content设置了unique
// try {
//   let learningItem
//     learningItem = await modelTarget.create(req.body);
//   res.status(200).json({ success: true, data: learningItem });
// } catch (err) {
//   res.status(400).json({ success: false });
// }
// break;