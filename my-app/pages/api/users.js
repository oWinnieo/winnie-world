// import dbConnect from '../../lib/db';
// import User from '../../models/Users';

// export default async function handler(req, res) {
//   const { method } = req;

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
// }