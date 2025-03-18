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
  collectionNameForLearning as colLearning,
  collectionNameLikeOrFavorite as colLikeOrFav,
  collectionNameInteraction as colInteract
} from '../../src/constants/collectionName' // wtest mock
import { modelEn,
  modelJp,
  modelServer,
  ModelLearningItem
} from '../../models/learningItem'; // wtest ModelLearningItem
import { modelListNav } from "../../models/listNav";
import { modelComment } from '../../models/comment';
import { modelLike } from 'models/like'; // wtest
import { modelFavorite } from 'models/favorite'; // wtest
import { modelUser } from '../../models/users';
/* wtest auth mock wtest here server session */
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
/* /wtest auth mock */
/* wtest auth mock */
import { userInfo } from '@/constants/userInfo' // wtest mock
/* /wtest auth mock */

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

const getCommentRepliedToComment_Of1ListItem = async ({ items, model, fieldsFor_CommentQuery, fieldsFor_UserQuery, session }) => {
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
        userId: session.user.userId
      })
      const {
        countLike,
        countFavorite
      } = await getLikeFavorite_Of1Item({
        id: item._id, // wtest : '67d2ee5454aafd63f8cc1e76',
        collectionName: 'comment', // wtest : 'english',
        gettingType: 'count'
      })
      // console.log(
      //   'item', item,
      //   'aha', '??',
      //   'session', session ? session : '??',
      //   // 'session.user.userId', session.user.userId
      //   'interactExistsLike', interactExistsLike,
      //   'interactExistsFavorite', interactExistsFavorite,
      //   'countLike', countLike,
      //   'countFavorite', countFavorite
      // )
      return {
        ...item,
        likeStatus: !!interactExistsLike,
        favoriteStatus: !!interactExistsFavorite,
        like: countLike,
        favorite: countFavorite
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
  session }) => {
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
  const commentReplied = await getCommentRepliedToComment_Of1ListItem({ items: commentItemsWithAuthor, model: modelComment, fieldsFor_CommentQuery, session })
  return commentReplied
}

const getLikeFavoriteStatus_Of1Item_For1User = async ({
  id,
  collectionName,
  userId
}) => {
  const interactExistsLike = await modelLike.exists({
    belongToItemId: id,
    belongToItemCollection: collectionName,
    authorId: userId
   }).lean();
   const interactExistsFavorite = await modelFavorite.exists({
    belongToItemId: id,
    belongToItemCollection: collectionName,
    authorId: userId
   }).lean();
  //  console.log('interactExists_Like', interactExists_Like,
  //   'interactExists_Favorite', interactExists_Favorite
  //  )
   return {
    interactExistsLike,
    interactExistsFavorite
   }
}

const getLikeFavorite_Of1Item = async ({
  id,
  collectionName,
  gettingType,
  fieldsFor_LikeFavQuery,
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
    return {
      countLike,
      countFavorite
    }
  } else {
    if (fieldsFor_LikeFavQuery === '_id') {
      const likeForThisItem = await modelLike.find({
        belongToItemCollection: collectionName,
        belongToItemId: id
      }, fieldsFor_LikeFavQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
      const favForThisItem = await modelFavorite.find({
        belongToItemCollection: collectionName,
        belongToItemId: id
      }, fieldsFor_LikeFavQuery)
      .skip(skipNumParam)
      .limit(limitNumParam)
      .sort({ createdAt: -1 })
      .lean() // 获取所有item
      // console.log('aha', {
      //   likeForThisItem,
      //   favForThisItem
      // })
      return {
        likeForThisItem,
        favForThisItem
      }
    }
  }
}

const getLikeFavorite_Of1Item__wtest = async ({
  gettingType,

}) => {

}

const getCommentCount_Of1List_OfItem = async ({
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
      // if (item.title === 'ABC123') {
        const {
          countLike,
          countFavorite
        } = await getLikeFavorite_Of1Item({
          id: item._id,
          collectionName: collectionName,
          gettingType: 'count'
        })
        // console.log({
        //   type: 'wtest set value 2 >>>>>>',
        //   wtest_d,
        //   collectionName,
        //   itemId: item?._id,
        //   itemTitle: item.title,
        //   countComment,
        //   // countLike: countLike ? countLike : 0, // wtest likeCount,
        //   // countFavorite: countFavorite ? countFavorite : 0, // wtest favoriteCount
        // }) // wtest
      // }
      return {
        ...item,
        countComment,
        countLike,
        countFavorite
      }
    })
  )
  return res
}


// const interactInfoOfInteractor = async ({ params, session }) => {
//     const resLike = await fetch(`${params.urlDomain}?collectionName=like&belongToItemId=${params.data.id}&belongToItemCollection=${params.collectionName}&interactorId=${session.user.userId}`, {
//         cache: 'no-store'
//     }).then(res => res.json())
//     const resFavorite = await fetch(`${params.urlDomain}?collectionName=favorite&belongToItemId=${params.data.id}&belongToItemCollection=${params.collectionName}&interactorId=${session.user.userId}`, {
//         cache: 'no-store'
//     }).then(res => res.json())
//     console.log('resLike', resLike, 'resFavorite', resFavorite)
// }
// useEffect(() => {
//     const aa = interactInfoOfInteractor({ params, session })
//     console.log('aa', aa)
// }, [])

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
  console.log('handler')
  /* wtest auth mock */
  const session = await getServerSession(req, res, authOptions);
  /* /wtest auth mock */
  /* wtest auth mock * // wtest here session 服务端的没有获取到, why
  const session = {
    user: userInfo
    // user: {}
  }
  /* /wtest auth mock */
  console.log('session (from_ getServerSession) >>>>>>>>------------------', session)

  const { method } = req;
  const { collectionName, fetchType, id, group, belongToItemCollection, belongToItemId, skipNum, limitNum } = req.query
  let skipNumParam = skipNum ? skipNum : undefined
  let limitNumParam = limitNum ? limitNum : undefined
  // console.log('wtest req.query >>>>>>>>> 111', req.query)
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
    case 'like':
        modelTarget = modelLike
        break;
    case 'favorite':
        modelTarget = modelFavorite
        break;
  }

  await dbConnect();
  switch (method) {
    case 'GET':
      if (fetchType === 'list') {
        try {
            if (colInteract.includes(collectionName)) {
              if (collectionName === 'comment' &&
                belongToItemCollection &&
                belongToItemId
              ) {
                // console.log('wtest if <<< list, comment, >>>', 'belongToItemCollection', belongToItemCollection, 'belongToItemId', belongToItemId)
                const commentReplied = await getComments_Of1Item({
                  model: modelTarget,
                  belongToItemCollection,
                  belongToItemId,
                  session
                })
                // console.log('commentReplied', commentReplied)
                res.status(200).json({ success: true, data: commentReplied, skipNum: skipNumParam, limitNum: limitNumParam });
              } else {
                // console.log('no 123 ----------- belongToItemCollection', 'collectionName', collectionName)
                const { userId } = req.query
                const listOfItem = await modelTarget.find({
                  authorId: userId
                })
                // console.log('listOfItem >>>', 'collectionName', collectionName, listOfItem, 'colInteract', colInteract)
                if(colInteract.includes(collectionName)) {
                  const listOfItemWithBelongToItemInfo = await Promise.all(
                    listOfItem.map(async (item) => {
                      // console.log('item', item)
                      const itemTemp = item.toObject()
                      let modelItemFor1User
                      switch (itemTemp.belongToItemCollection) {
                        case 'english':
                          modelItemFor1User = modelEn
                          break;
                        case 'japanese':
                          modelItemFor1User = modelJp
                          break;
                        case 'server':
                          modelItemFor1User = modelServer
                          break;
                        case 'comment':
                          modelItemFor1User = modelComment
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
                  // console.log('listOfItemWithBelongToItemInfo', listOfItemWithBelongToItemInfo)
                  res.status(200).json({ success: true, data: listOfItemWithBelongToItemInfo, skipNum: skipNumParam, limitNum: limitNumParam });
                } else {
                  res.status(200).json({ success: true, data: listOfItem, skipNum: skipNumParam, limitNum: limitNumParam });
                }
                
              }
              /*
              console.log('no 123 ----------- belongToItemCollection', 'collectionName', collectionName)
                const { userId } = req.query
                // let listOfItem
                const res = await modelTarget.find({
                  authorId: userId
                })
                console.log('res', res)
                // switch (collectionName) {
                //   // case 'comment':
                //   //   listOfItem = res
                //   //   break;
                //   case 'like':
                //     break;
                //   case 'favorite':
                //     break;
                //   default:
                //     listOfItem = res
                // }
                res.status(200).json({ success: true, data: res, skipNum: skipNumParam, limitNum: limitNumParam });
              */
            } else {
              const learningItems = await modelTarget.find({})
                .skip(skipNumParam)
                .limit(limitNumParam)
                .sort({ createdAt: -1 })
                .lean() // 获取所有item
              // console.log('collectionName', collectionName, 'learningItems', learningItems)
              if (colLearning.includes(collectionName)) {
                const learningItemsWithAuthor = await getItemAuthor_Of1ListItem({ items: learningItems, model: modelUser })
                const learningItemsWithAuthorWithCommentCount = await getCommentCount_Of1List_OfItem({
                  items: learningItemsWithAuthor,
                  // model: modelComment, // wtest
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
            // console.log('collectionName -----------------> 123', collectionName, fetchType, userId)
            try {
                const user = await modelTarget.findOne({ userId })
                // console.log('user', user)
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
              // console.log('wtest fetch item >>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                const learningItem = await modelTarget.findOne({ _id: id }).lean();
                if (colLearning.includes(collectionName)) {
                  const user = await modelUser.findOne({ userId: learningItem.authorId })
                  /* wtest */
                  // console.log('id', id, 'collectionName', collectionName, 'session', session )
                  const { interactExistsLike,
                    interactExistsFavorite } = await getLikeFavoriteStatus_Of1Item_For1User({
                    id,
                    collectionName,
                    userId: session.user.userId
                  })
                  const {
                    countLike,
                    countFavorite
                  } = await getLikeFavorite_Of1Item({
                    id,
                    collectionName,
                    gettingType: 'count'
                  })
                  // console.log(
                  //   'wtest set value 1 >>>>>>',
                  //   'id', id,
                  //   'collectionName', collectionName,
                  //   'learningItem', learningItem,
                  //   'countLike', countLike,
                  //   'countFavorite', countFavorite
                  // )
                  /* /wtest */
                  // console.log('learningItem >>>>>>>>>>', learningItem)
                  res.status(200).json({ success: true, data: {
                    ...learningItem,
                    authorInfo: user,
                    likeStatus: !!interactExistsLike,
                    favoriteStatus: !!interactExistsFavorite,
                    like: countLike,
                    favorite: countFavorite
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
        const { authorId, belongToItemId, belongToItemCollection } = req.body // wtest here 和上面来自不同的fetch,所以query不同?
        // console.log('modelTarget ---------->', modelTarget,
          // 'req.body', req.body,
          // 'collectionName', collectionName)
        if (colLikeOrFav.includes(collectionName) || collectionName === 'user') {
            // console.log('wtest -------->>>>>> authorId', authorId,
              // 'belongToItemId', belongToItemId,
              // 'belongToItemCollection', belongToItemCollection
            // )
          // 查询是否存在符合条件的条目
          const interactExists = await modelTarget.exists({
            belongToItemId,
            belongToItemCollection,
            authorId
           }).lean();
           // console.log('interactExists', interactExists, 'modelTarget', modelTarget)
          const msgSet = collectionName === 'like' ? 'like success' : 'favorite success'
          const msgUnset = collectionName === 'like' ? 'unlike success' : 'unfavorite success'
          if (interactExists) {
            const resUnlike = await modelTarget.deleteOne({ _id: interactExists._id });
            res.status(200).json({ success: true, message: msgUnset, data: resUnlike });
          } else {
            const resLike = await modelTarget.create(req.body);
            res.status(200).json({ success: true, message: msgSet, data: resLike });
          }
        } else {
          const learningItem = await modelTarget.create(req.body);
          res.status(200).json({ success: true, data: learningItem });
        }
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
        // console.log('wtest delete >>> collectionName', collectionName)
        // console.log('group', group)
        // console.log('id', id)
        // console.log('belongToItemCollection', belongToItemCollection)
        // console.log('belongToItemId', belongToItemId)
        // console.log('req.body', req.body)
        // console.log('result.deletedCount', result?.deletedCount)
        // debugger;
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
        // console.log('commentsForDelete', commentsForDelete)
        if (commentsForDelete?.length > 0) {
          const resultForCommentDel = await modelComment.deleteMany({ _id: { $in: commentsForDelete } });
        }
        const {
          likeForThisItem,
          favForThisItem
        } = await getLikeFavorite_Of1Item({
          id,
          collectionName,
          fieldsFor_LikeFavQuery: '_id'
        })
        // console.log('like and fav', {
        //   likeForThisItem,
        //   favForThisItem
        // })
        if (likeForThisItem?.length > 0) {
          const resultForLikeDelete = await modelLike.deleteMany({ _id: { $in: likeForThisItem } });
        }
        if (favForThisItem?.length > 0) {
          const resultForFavDelete = await modelFav.deleteMany({ _id: { $in: favForThisItem } });
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