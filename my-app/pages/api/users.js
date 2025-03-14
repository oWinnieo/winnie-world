import dbConnect from '../../lib/db';
import { modelUser } from '../../models/users';

export default async function handler(req, res) {
  const { method } = req;
  const { collectionName, fetchType } = req.query
  let modelTarget
  switch (collectionName) {
    case 'user':
        modelTarget = modelUser
        break;
  }
  await dbConnect();
  switch (method) {
    case 'GET':
      if (fetchType === 'one') {
        // console.log('user fetchType >>>>>>>>> 1', fetchType)
        // console.log('collectionName ----------------->', collectionName)
        const { userId, email } = req.query;
        // console.log('~~userId', userId)
        // console.log('~~email', email)
        // debugger;
        try {
            // 查询是否存在符合条件的条目
            // const userExists = await modelTarget.exists({ userId, email });
            const user = await modelTarget.findOne({ userId, email })
            // const user = await modelTarget.find({})
            // const user = await modelTarget.countDocuments({})
            // console.log('--------->>> userExists', user) // wtest waiting
            // debugger;
            if (user) {
                res.status(200).json({ success: true, data: user });
            } else {
                res.status(200).json({ success: false, message: "Item not found" });
                // data: [],
            }
        } catch (error) {
            res.status(500).json({ error: '数据库查询出错' });
        }
      } else if (fetchType === 'list') {
        // console.log('user fetchType >>>>>>>>> 2', fetchType)
      }
        
      break;
    case 'POST':
      try {
        let userAdded = await modelTarget.create(req.body);
        res.status(200).json({ success: true, data: userAdded })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break;
    case 'PUT':
      try {
        const { _id: id, ...updateData } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
          }
        let userUpdated = await modelTarget.findByIdAndUpdate(id, updateData, {
          new: true, // 返回更新后的数据
          runValidators: true, // 运行 Mongoose 校验
        });
        if (!userUpdated) {
          return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: userUpdated });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;
    case 'DELETE': // wtest waiting
      try {
        const { id } = req.body
        if (!id) {
          return res.status(400).json({ success: false, error: 'Missing ID' });
        }
        let deleteUser
          deleteUser = await modelTarget.deleteOne({ _id: id });
        if (deleteUser.deletedCount === 0) {
          return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
      break;
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