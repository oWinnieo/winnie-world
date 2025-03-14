import dbConnect from "../../lib/db";
import { modelListNav } from "models/listNav";

// import { modelEn,
//   modelJp,
//   modelServer,
//   ModelLearningItem
// } from '../../models/learningItem';

export default async function handler (req, res) {
    const { method } = req
    const { collectionName, group, fetchType } = req.query
    let modelTarget
    switch (collectionName) {
        case 'listNav':
            modelTarget = modelListNav
            break;
    }
    await dbConnect()
    switch(method) {
        case 'GET':
          if (fetchType === 'list') {
            console.log('??')
            try {
                let listNav
                  listNav = await modelTarget.find({}).sort({ createdAt: -1 }) // 获取所有item
                  console.log('listNav', listNav)
                res.status(200).json({ success: true, data: listNav });
                          
            } catch (err) {
              res.status(400).json({ success: false });
            }
          }
          break;
        case 'POST':
          try {
            const listNavItem = await modelTarget.create(req.body);
            res.status(200).json({ success: true, data: learningItem });
          } catch (err) {
            res.status(400).json({ success: false });
          }
          break;
    }
}