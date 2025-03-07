import dbConnect from '../../lib/db';
import { modelUser } from '../../models/users';

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName } = req.query
  let modelTarget
  switch (collectionName) {
    case 'user':
        modelTarget = modelUser
        console.log('wtest 1')
        break;
  }
  await dbConnect();
  switch (method) {
    case 'GET':
        const { userId, email } = req.query;
        console.log('~~userId', userId)
        console.log('~~email', email)
        debugger;
        try {
            // 查询是否存在符合条件的条目
            // const userExists = await modelTarget.exists({ userId, email });
            // const user = await modelTarget.findOne({ userId, email })
            const user = await modelTarget.find({})
            // const user = await modelTarget.countDocuments({})
            console.log('--------->>> userExists', user)
            // debugger;
            if (user) {
                console.log('yes wtest')
                res.status(200).json({ success: true, data: user });
                // res.status(200),json({ success: true })
            } else {
                console.log('no wtest')
                res.status(200).json({ success: false, message: "Item not found" });
            }
        } catch (error) {
            res.status(500).json({ error: '数据库查询出错' });
        }
    break;
    /* wtest *
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
    /* /wtest */
  }
//   await dbConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const users = await User.find({}); // 获取所有用户
//         res.status(200).json({ success: true, data: users });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'POST':
//       try {
//         const user = await User.create(req.body); // 创建用户
//         res.status(201).json({ success: true, data: user });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
}