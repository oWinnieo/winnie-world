// import dbConnect from '@/lib/db';
// import LearningItem from '@/models/learning-item'
// import { NextResponse } from 'next/server';
// export async function POST (req) {
//     const { title, content } = await req.json()
//     await dbConnect();
//     await LearningItem.create({ title, content })
//     return NextResponse.json({ message: 'Learning Item Created!'}, { status: 201 })
// }
/*
const listData = await getListData(params); <in ItemList>
params: {
  urlDomain
  collectionName
}

getListData <in slug page>
params: {
  urlDomain
  collectionName
  belongToItemCollection: slug[0],
  belongToItemId: slug[1]
}

getListData <in group page>
params: {
  group,
  urlDomain,
  collectionName: 'listNav',
  belongToItemCollection: slug[0],
  belongToItemId: slug[1]
}
*/
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import dbConnect from '../../lib/db';
import { collectionNameForLearning as colLearning } from '../../src/constants/collectionName' // wtest mock
import { modelEn,
  modelJp,
  modelServer,
  ModelLearningItem
} from '../../models/learningItem'; // wtest ModelLearningItem
import { modelListNav } from "../../models/listNav";
import { modelComment } from '../../models/comment-Why';
import { modelabtest } from 'models/abTest'; // wtest
import { modelUser } from '../../models/users';

const getItemAuthorOf1ListOfItem = async ({ items, model, fieldsStrForUser }) => {
  const authorIdArr = [...new Set(items.map(item => item.authorId))]
  const userArr = await model.find({
    userId: { $in: authorIdArr }
  }, fieldsStrForUser ? fieldsStrForUser : undefined).lean()
  const learningItemsWithAuthor = items.map(item => {
    return {
      ...item,
      authorInfo: userArr.find(user => user.userId === item.authorId)
    }
  })
  return learningItemsWithAuthor
}

const getCommentRepliedToComment = async ({ items, model, fieldsStrForComment, fieldsStrForUser }) => {
  const replyToCommentIdArr  = items.map(item => item.replyToCommentId).filter(item1 => item1 !== undefined)
  const replyToCommentArr = await model.find({
    _id: { $in: replyToCommentIdArr }
  }, fieldsStrForComment ? fieldsStrForComment : undefined).lean()
  const replyToCommentWithAuthor = await getItemAuthorOf1ListOfItem({ items: replyToCommentArr, model: modelUser, fieldsStrForUser })
  const commentItemsWithReplies = items.map(item => {
    const itemNew = {...item}
    if (item.replyToCommentId) {
      itemNew.replyToCommentInfo = replyToCommentWithAuthor.find(reply => reply._id.equals(new ObjectId(item.replyToCommentId)))
    }
    return itemNew
  })
  return commentItemsWithReplies
}

const getCommentsOf1Item = async ({
  model,
  belongToItemCollection,
  belongToItemId,
  gettingType,
  skipNumParam,
  limitNumParam,
  fieldsStrForComment,
  fieldsStrForUser }) => {
  if (gettingType === 'count') {
    const commentCount = await model.countDocuments({
      belongToItemCollection,
      belongToItemId
    })
    return commentCount
  }
  if (fieldsStrForComment === '_id') {
    const commentItemsForThisPost = await model.find({belongToItemCollection, belongToItemId}, fieldsStrForComment)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
    return commentItemsForThisPost
  }
  const commentItems = await model.find({belongToItemCollection, belongToItemId}, fieldsStrForComment ? fieldsStrForComment : undefined)
    .skip(skipNumParam)
    .limit(limitNumParam)
    .sort({ createdAt: -1 })
    .lean() // 获取所有item
  
  const commentItemsWithAuthor = await getItemAuthorOf1ListOfItem({ items: commentItems, model: modelUser, fieldsStrForUser })
  const commentReplied = await getCommentRepliedToComment({ items: commentItemsWithAuthor, model: modelComment, fieldsStrForComment })
  return commentReplied
}

const getCommentCountOf1ListOfItem = async ({
  items,
  model,
  collectionName
}) => {
  // console.log('???')
  // const infoOf1Item = items.map(item => {
  //   // console.log('item', item)
  //   return ({
  //     model,
  //     belongToItemCollection: collectionName,
  //     belongToItemId: item._id
  //   })
  // })
  const res = await Promise.all(
    items.map(async (item) => {
      const commentCount = await getCommentsOf1Item({
        model,
        belongToItemCollection: collectionName,
        belongToItemId: item._id,
        gettingType: 'count'
      })
      return {
        ...item,
        commentCount
      }
    })
  )
  return res
}

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName, fetchType, id, group, belongToItemCollection, belongToItemId, skipNum, limitNum } = req.query
  let skipNumParam = skipNum ? skipNum : undefined
  let limitNumParam = limitNum ? limitNum : undefined
  // console.log('wtest req.query >>>>>>>>>', req.query)
  let modelTarget
  switch (collectionName) {
    case 'english':
        modelTarget = modelEn
        break;
    case 'japanese':
        modelTarget = modelJp // wtest modelJp
        break;
    case 'server':
        modelTarget = modelServer
        break;
    case 'user':
        modelTarget = modelUser
        break;
    case 'listNav':
        modelTarget = modelListNav
        break;
    case 'comment':
        modelTarget = modelComment
        break;
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      if (fetchType === 'list') {
        try {
            if (collectionName === 'comment') {
              const commentReplied = await getCommentsOf1Item({
                model: modelTarget,
                belongToItemCollection,
                belongToItemId
              })
              res.status(200).json({ success: true, data: commentReplied, skipNum: skipNumParam, limitNum: limitNumParam });
            } else {
              const learningItems = await modelTarget.find({})
                .skip(skipNumParam)
                .limit(limitNumParam)
                .sort({ createdAt: -1 })
                .lean() // 获取所有item
              // console.log('collectionName', collectionName, 'learningItems', learningItems)
              if (colLearning.includes(collectionName)) {
                const learningItemsWithAuthor = await getItemAuthorOf1ListOfItem({ items: learningItems, model: modelUser })
                const learningItemsWithAuthorWithCommentCount = await getCommentCountOf1ListOfItem({
                  items: learningItemsWithAuthor, model: modelComment,
                  collectionName
                })
                // console.log('learningItemsWithAuthorWithCommentCount ???', learningItemsWithAuthorWithCommentCount)
                res.status(200).json({ success: true, data: learningItemsWithAuthorWithCommentCount, skipNum: skipNumParam, limitNum: limitNumParam });
              } else {
                res.status(200).json({ success: true, data: learningItems, skipNum: skipNumParam, limitNum: limitNumParam });
              }
            }
        } catch (err) {
          res.status(400).json({ success: false });
        }
      } else if (fetchType === 'one') {
        // console.log('wtest waiting --------------->', collectionName, fetchType) // wtest modelTarget
        if (collectionName === 'user') {
            const { userId, email } = req.query;
            console.log('collectionName -----------------> 123', collectionName, fetchType, userId)
            try {
                // 查询是否存在符合条件的条目
                // const userExists = await modelTarget.exists({ userId, email });
                const user = await modelTarget.findOne({ userId })
                console.log('user', user)
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
                if (colLearning.includes(collectionName)) {
                  const user = await modelUser.findOne({ userId: learningItem.authorId })
                  // console.log('user >>>>>>>>>>', user)
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

      // wtest waiting user creating
      break;
    case 'PUT': // edit
      try {
        const { ...updateData } = req.body; // 获取 id 和要更新的数据
        const id = req.body._id || req.body.id

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
        const id = req.body._id || req.body.id; // 前端需要在 body 里传 id
        // console.log('collectionName', collectionName)
        // console.log('group', group)
        // console.log('id', id)
        // console.log('belongToItemCollection', belongToItemCollection)
        // console.log('belongToItemId', belongToItemId)
        // console.log('req.body', req.body)
        const commentsForDelete = await getCommentsOf1Item({
          model: modelComment,
          belongToItemCollection: collectionName,
          belongToItemId: id,
          fieldsStrForComment: '_id'
        })
        console.log('commentsForDelete', commentsForDelete)
        const result = await modelComment.deleteMany({ _id: { $in: commentsForDelete } }); 
        console.log('result.deletedCount', result?.deletedCount)
        // debugger;
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