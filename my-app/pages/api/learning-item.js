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
import LearningItem from '../../models/learningItem';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // if (req.id) {
        //   console.log('1')
        //   const learningOneItem = await LearningItem.findOne({ _id: req.id })
        //   res.status(200).json({ success: true, data: {a: 'aha'}})
        // } else {
          console.log('2')
          const learningItems = await LearningItem.find({}).sort({ "createdAt": -1 }).toArray(); // 获取所有item
          res.status(200).json({ success: true, data: learningItems });
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
    case 'POST':
      try {
        const learningItem = await LearningItem.create(req.body); // 创建item
        res.status(201).json({ success: true, data: learningItem });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}