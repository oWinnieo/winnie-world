import dbConnect from "lib/db";
import { modelListNav } from "models/listNav";

export default async function handler (req, res) {
    const { method } = req
    const { collectionName } = req.query
    let modelTarget
    switch (collectionName) {
        case 'listNav':
            modelTarget = modelListNav
            break;
    }
    await dbConnect()
    switch(method) {
        case 'GET':
            try {
                // if (req.id) {
                //   const learningOneItem = await LearningItem.findOne({ _id: req.id })
                //   res.status(200).json({ success: true, data: {a: 'aha'}})
                // } else {
                  let listNav
                    listNav = await modelTarget.find({}).sort({ createdAt: -1 }) // 获取所有item
                  res.status(200).json({ success: true, data: listNav });
              } catch (err) {
                res.status(400).json({ success: false });
              }
            break;
    }
}