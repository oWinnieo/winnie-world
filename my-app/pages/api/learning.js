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
import {
  collectionNameLikeOrFavorite as colLikeOrFav,
  collectionNameInteraction as colInteract,
  collectionNameShare as colShare
} from '../../src/constants/collectionName' // wtest mock
import {
  LearningItemSchema
} from '../../models/learningItem';
import { modelListNav } from "models/listNav";
import { modelComment } from 'models/comment';
import { modelLike } from 'models/like'; // wtest
import { modelFavorite } from 'models/favorite'; // wtest
import { modelShare } from 'models/share'; // wtest
import { modelUser } from 'models/users';
import { modelIntro } from 'models/intro'

const getListDataOfNav = async ({
  modelTarget,
  skipNumParam,
  limitNumParam
}) => {
  return await modelTarget.find()
    .skip(skipNumParam)
    .limit(limitNumParam)
    .sort({ createdAt: -1 })
    .lean() // 获取所有item
}

const getColLearning = (listNav) => {
  return listNav.map(item => item.colName)
}

/* model */
function getModel(modelName, schema) {
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
}
/* /model */

const getItemAuthor_Of1ListItem = async ({ items, model, fieldsFor_UserQuery }) => {
  const authorIdArr = [...new Set(items.map(item => item.authorId))]
  const userArr = await model.find({
    userId: { $in: authorIdArr }
  }, fieldsFor_UserQuery ? fieldsFor_UserQuery : undefined).lean()
  const learningItemsWithAuthor = items.map(item => {
    return {
      ...item,
      authorInfo: userArr.find(user => user.userId === item.authorId)
    }
  })
  return learningItemsWithAuthor
}

const getCommentRepliedToComment_Of1ListItem = async ({ items, model, fieldsFor_CommentQuery, fieldsFor_UserQuery, sessionUserId }) => {
  const replyToCommentIdArr  = items.map(item => item.replyToCommentId).filter(item1 => item1 !== undefined)
  const replyToCommentArr = await model.find({
    _id: { $in: replyToCommentIdArr }
  }, fieldsFor_CommentQuery ? fieldsFor_CommentQuery : undefined).lean()
  const replyToCommentWithAuthor = await getItemAuthor_Of1ListItem({ items: replyToCommentArr, model: modelUser, fieldsFor_UserQuery })
  const commentItemsWithReplies = items.map(item => {
    const itemNew = {...item}
    if (item.replyToCommentId) {
      itemNew.replyToCommentInfo = replyToCommentWithAuthor.find(reply => reply._id.equals(new ObjectId(item.replyToCommentId)))
    }
    return itemNew
  })
  const commentItemsWithRepliesAndLikeFav = await Promise.all(
    commentItemsWithReplies.map(async item => {
      const { interactExistsLike,
        interactExistsFavorite } = await getLikeFavoriteStatus_Of1Item_For1User({
        id: item._id,
        collectionName: 'comment',
        sessionUserId
      })
      const {
        countLike,
        countFavorite,
        countShare
      } = await getLikeFavorite_Of1Item({
        id: item._id, // wtest : '67d2ee5454aafd63f8cc1e76',
        collectionName: 'comment', // wtest : 'english',
        gettingType: 'count'
      })
      return {
        ...item,
        likeStatus: !!interactExistsLike,
        favoriteStatus: !!interactExistsFavorite,
        like: countLike,
        favorite: countFavorite,
        share: countShare
      }
      
    })
  )
  return commentItemsWithRepliesAndLikeFav
}

const getComments_Of1Item = async ({
  model,
  belongToItemCollection,
  belongToItemId,
  gettingType,
  skipNumParam,
  limitNumParam,
  fieldsFor_CommentQuery,
  fieldsFor_UserQuery,
  sessionUserId }) => {
  if (gettingType === 'count') {
    const countComment = await model.countDocuments({
      belongToItemCollection,
      belongToItemId
    })
    return countComment
  }
  if (fieldsFor_CommentQuery === '_id') {
    const commentItemsForThisItem = await model.find({belongToItemCollection, belongToItemId}, fieldsFor_CommentQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
    return commentItemsForThisItem
  }
  const commentItems = await model.find({belongToItemCollection, belongToItemId}, fieldsFor_CommentQuery ? fieldsFor_CommentQuery : undefined)
    .skip(skipNumParam)
    .limit(limitNumParam)
    .sort({ createdAt: -1 })
    .lean() // 获取所有item
  
  const commentItemsWithAuthor = await getItemAuthor_Of1ListItem({ items: commentItems, model: modelUser, fieldsFor_UserQuery })
  const commentReplied = await getCommentRepliedToComment_Of1ListItem({ items: commentItemsWithAuthor, model: modelComment, fieldsFor_CommentQuery, sessionUserId })
  return commentReplied
}

const getLikeFavoriteStatus_Of1Item_For1User = async ({
  id,
  collectionName,
  sessionUserId
}) => {
  if (!sessionUserId) {
    return {
      interactExistsLike: false,
      interactExistsFavorite: false
    }
  }
  const interactExistsLike = await modelLike.exists({
    belongToItemId: id,
    belongToItemCollection: collectionName,
    authorId: sessionUserId
   }).lean();
   const interactExistsFavorite = await modelFavorite.exists({
    belongToItemId: id,
    belongToItemCollection: collectionName,
    authorId: sessionUserId
   }).lean();
  //  const interactExistsShare = await modelShare.exists({
  //   belongToItemId: id,
  //   belongToItemCollection: collectionName,
  //   authorId: sessionUserId
  //  }).lean();
   return {
    interactExistsLike,
    interactExistsFavorite
   }
}

const getLikeFavorite_Of1Item = async ({
  id,
  collectionName,
  gettingType,
  fieldsFor_LikeFavShareQuery,
  skipNumParam,
  limitNumParam
}) => {
  if (gettingType === 'count') {
    const countLike = await modelLike.countDocuments({
      belongToItemId: id,
      belongToItemCollection: collectionName
    })
    const countFavorite = await modelFavorite.countDocuments({
      belongToItemId: id,
      belongToItemCollection: collectionName
    })
    const countShare = await modelShare.countDocuments({
      belongToItemId: id,
      belongToItemCollection: collectionName
    })
    return {
      countLike,
      countFavorite,
      countShare
    }
  } else {
    if (fieldsFor_LikeFavShareQuery === '_id') {
      const likeForThisItem = await modelLike.find({
        belongToItemCollection: collectionName,
        belongToItemId: id
      }, fieldsFor_LikeFavShareQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
      const favForThisItem = await modelFavorite.find({
        belongToItemCollection: collectionName,
        belongToItemId: id
      }, fieldsFor_LikeFavShareQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
      const shareForThisItem = await modelShare.find({
        belongToItemCollection: collectionName,
        belongToItemId: id
      }, fieldsFor_LikeFavShareQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
      return {
        likeForThisItem,
        favForThisItem,
        shareForThisItem
      }
    }
  }
}

const getLikeFavorite_Of1Item__wtest = async ({
  gettingType,

}) => {

}

const getInteractionCount_Of1List_OfItem = async ({
  items,
  // model, // wtest
  collectionName
}) => {
  const res = await Promise.all(
    items.map(async (item) => {
      const countComment = await getComments_Of1Item({
        model: modelComment,
        belongToItemCollection: collectionName,
        belongToItemId: item._id,
        gettingType: 'count'
      })
      const {
        countLike,
        countFavorite,
        countShare
      } = await getLikeFavorite_Of1Item({
        id: item._id,
        collectionName: collectionName,
        gettingType: 'count'
      })
      return {
        ...item,
        countComment,
        countLike,
        countFavorite,
        countShare
      }
    })
  )
  return res
}

const getLikeCountOf1ListOfItem = async ({
  items,
  collectionName
}) => {
  const res = await Promise.all(
    items.map(async (item) => {
      
    })
  )
  // id,
  // collectionName
  // wtest here every item need like count
}

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName, fetchType, id, group, belongToItemCollection, belongToItemId, sessionUserId, status, page, limit } = req.query
  let skipNumParam = (page !== 'undefined' && limit !== 'undefined' && page >= 1 && limit) ? (page - 1) * limit : undefined
  let limitNumParam = limit !== 'undefined' ? limit : undefined
  let modelTarget
  switch (collectionName) {
    case 'user':
        modelTarget = modelUser
        break;
    case 'listNav':
        modelTarget = modelListNav
        break;
    case 'comment':
        modelTarget = modelComment
        break;
    case 'like':
        modelTarget = modelLike
        break;
    case 'favorite':
        modelTarget = modelFavorite
        break;
    case 'intro':
        modelTarget = modelIntro
        break;
    default:
        modelTarget = getModel(collectionName, LearningItemSchema)
  }

  await dbConnect();

  const resListNav = await getListDataOfNav({
    modelTarget: modelListNav,
    skipNumParam: undefined,
    limitNumParam: undefined
  })
  const colLearning = getColLearning(resListNav)
  
  switch (method) {
    case 'GET':
      if (fetchType === 'list') {
        try {
          switch (collectionName) {
            case 'listNav':
              res.status(200).json({ success: true, data: resListNav, skipNum: skipNumParam, limitNum: limitNumParam });
              break;
            default:
              let totalItems = 0
                  if (colInteract.includes(collectionName)) {
                    if (collectionName === 'comment' &&
                      belongToItemCollection &&
                      belongToItemId
                    ) {
                      const commentReplied = await getComments_Of1Item({
                        model: modelTarget,
                        belongToItemCollection,
                        belongToItemId,
                        sessionUserId
                      })
                      res.status(200).json({ success: true, data: commentReplied, skipNum: skipNumParam, limitNum: limitNumParam });
                    } else {
                      const { userId } = req.query
                      if (collectionName === 'item') {
                        const listOfItemsByThisAuthor = await Promise.all(
                          colLearning.map(async (colName) => {
                            let modelItemFor1User = getModel(colName, LearningItemSchema)
                            
                            const itemData = await modelItemFor1User.find({
                              authorId: userId
                            })
                            return {
                              area: colName,
                              list: itemData
                            }
                          })
                        )
                        res.status(200).json({
                          success: true,
                          data: listOfItemsByThisAuthor,
                          // data: ['1', '2'],
                          skipNum: skipNumParam,
                          limitNum: limitNumParam
                        })
                      } else {
                        const listOfItem = await modelTarget.find({
                          authorId: userId
                        })
                        if (colInteract.includes(collectionName)) {
                          const listOfItemWithBelongToItemInfo = await Promise.all(
                            listOfItem.map(async (item) => {
                              const itemTemp = item.toObject()
                              let modelItemFor1User
                              switch (itemTemp.belongToItemCollection) {
                                case 'comment':
                                  modelItemFor1User = modelComment
                                  break;
                                default:
                                  modelItemFor1User = getModel(collectionName, LearningItemSchema)
                                  break;
                              }
                              const itemInfo = await modelItemFor1User.findOne({
                                _id: itemTemp.belongToItemId
                              }).lean()
                              const itemNew = {
                                ...itemTemp,
                                belongToItemInfo: {
                                  ...itemInfo,
                                  itemType: itemTemp.belongToItemCollection
                                },
                              }
                              return itemNew
                            })
                          )
                          res.status(200).json({ success: true, data: listOfItemWithBelongToItemInfo, skipNum: skipNumParam, limitNum: limitNumParam });
                        } else {
                          res.status(200).json({ success: true, data: listOfItem, skipNum: skipNumParam, limitNum: limitNumParam });
                        }
                      }
                    }
                    
                  } else {
                    let learningItems
                    if (collectionName === 'user' || collectionName === 'intro') {
                      learningItems = await modelTarget.find()
                      .skip(skipNumParam)
                      .limit(limitNumParam)
                      .sort({ createdAt: -1 })
                      .lean() // 获取所有item
                    } else {
                      totalItems = await modelTarget.countDocuments({ status });
                      learningItems = await modelTarget.find({ status })
                      .skip(skipNumParam)
                      .limit(limitNumParam)
                      .sort({ createdAt: -1 })
                      .lean() // 获取所有item
                      // console.log('--->>> wtest',
                      //   'totalItems', totalItems,
                      //   'limit', limit,
                      //   'page', page,
                      //   'totalPages', Math.ceil(totalItems / limit),
                      //   'currentPage', page,
                      //   't1', Number(Math.ceil(totalItems / limit)),
                      //   't2', Number(page)
                      // )
                    }
                    if (colLearning.includes(collectionName)) {
                      const learningItemsWithAuthor = await getItemAuthor_Of1ListItem({ items: learningItems, model: modelUser })
                      const learningItemsWithAuthorWithCommentCount = await getInteractionCount_Of1List_OfItem({
                        items: learningItemsWithAuthor,
                        // model: modelComment, // wtest
                        collectionName
                      })
                      
                      const wtest1 = {
                        totalItems,
                        limit,
                        page,
                        totalPages: Number(Math.ceil(totalItems / limit)),
                        currentPage: Number(page)
                      }
                      console.log('wtest1', wtest1)
                      res.status(200).json({
                        success: true,
                        data: learningItemsWithAuthorWithCommentCount,
                        skipNum: skipNumParam,
                        limitNum: limitNumParam,
                        totalItems,
                        totalPages: Number(Math.ceil(totalItems / limit)),
                        currentPage: Number(page)
                      });
                    } else {
                      res.status(200).json({ success: true, data: learningItems, skipNum: skipNumParam, limitNum: limitNumParam });
                    }
                  }
          }
        } catch (err) {
          res.status(400).json({ success: false });
        }
          
          
      } else if (fetchType === 'one') {
        if (collectionName === 'user') {
            const { userId, email } = req.query;
            try {
                const user = await modelTarget.findOne({ userId })
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
                  const { interactExistsLike,
                    interactExistsFavorite } = await getLikeFavoriteStatus_Of1Item_For1User({
                    id,
                    collectionName,
                    sessionUserId
                  })
                  const {
                    countLike,
                    countFavorite,
                    countShare
                  } = await getLikeFavorite_Of1Item({
                    id,
                    collectionName,
                    gettingType: 'count'
                  })
                  res.status(200).json({ success: true, data: {
                    ...learningItem,
                    authorInfo: user,
                    likeStatus: !!interactExistsLike,
                    favoriteStatus: !!interactExistsFavorite,
                    like: countLike ? countLike : 0,
                    favorite: countFavorite ? countFavorite : 0,
                    share: countShare ? countShare : 0
                  } });
                } else {
                  res.status(200).json({ success: true, data: learningItem });
                }
            } catch (err) {
                res.status(400).json({ success: false });
            }
        }
        
      }
      
      break;
    case 'POST': // wtest here有的时候可以有的时候不行,为什么???
      console.log('wtest --> po')
      try {
        const { authorId, belongToItemId, belongToItemCollection } = req.body // wtest here 和上面来自不同的fetch,所以query不同?
        if (colLikeOrFav.includes(collectionName) || collectionName === 'user') {
          // 查询是否存在符合条件的条目
          const interactExists = await modelTarget.exists({
            belongToItemId,
            belongToItemCollection,
            authorId
           }).lean();
          const msgSet = collectionName === 'like' ? 'like success' : 'favorite success'
          const msgUnset = collectionName === 'like' ? 'unlike success' : 'unfavorite success'
          if (interactExists) {
            const resUnlike = await modelTarget.deleteOne({ _id: interactExists._id });
            res.status(200).json({ success: true, message: msgUnset, data: resUnlike });
          } else {
            const resLike = await modelTarget.create(req.body);
            res.status(200).json({ success: true, message: msgSet, data: resLike });
          }
        } else if (colShare.includes(collectionName)) {
          const resShare = await modelShare.create(req.body);
          res.status(200).json({ success: true, message: 'share success', data: resShare})
        } else {
          const learningItem = await modelTarget.create(req.body);
          res.status(200).json({ success: true, data: learningItem });
          // res.status(200).json({ success: true, data: {'wtest': '??'} });
        }
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT': // edit
      console.log('wtest --> pu')
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
        if (!id) {
          return res.status(400).json({ success: false, error: 'Missing ID' });
        }
        let deletedItem
          deletedItem = await modelTarget.deleteOne({ _id: id });
        if (deletedItem.deletedCount === 0) {
          return res.status(404).json({ success: false, error: 'Item not found' });
        }
        /* wtest related delete */
        const commentsForDelete = await getComments_Of1Item({
          model: modelComment,
          belongToItemCollection: collectionName,
          belongToItemId: id,
          fieldsFor_CommentQuery: '_id'
        })
        if (commentsForDelete?.length > 0) {
          const resultForCommentDel = await modelComment.deleteMany({ _id: { $in: commentsForDelete } });
        }
        const {
          likeForThisItem,
          favForThisItem,
          shareForThisItem
        } = await getLikeFavorite_Of1Item({
          id,
          collectionName,
          fieldsFor_LikeFavShareQuery: '_id'
        })
        if (likeForThisItem?.length > 0) {
          const resultForLikeDelete = await modelLike.deleteMany({ _id: { $in: likeForThisItem } });
        }
        if (favForThisItem?.length > 0) {
          const resultForFavDelete = await modelFav.deleteMany({ _id: { $in: favForThisItem } });
        }
        if (shareForThisItem?.length > 0) {
          const resultForShareDelete = await modelShare.deleteMany({ _id: { $in: shareForThisItem } })
        }
        /* /wtest related delete */
        res.status(200).json({ success: true, message: 'Item deleted successfully wtest >>>>>>>>>>>>>' });
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