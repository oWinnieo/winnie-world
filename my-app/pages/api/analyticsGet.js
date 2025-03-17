import { NextResponse } from "next/server";
import getAnalyticsData from "./analytics";

// export default async function GET() {
//   try {
//     const data = await getAnalyticsData();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: "无法获取数据" }, { status: 500 });
//   }
// }

export default async function handler(req, res) {
    const { method } = req
    // const data = await getAnalyticsData();
    
    try {
      // console.log('getAnalyticsData in <analyticsGet>', getAnalyticsData)
        const data = await getAnalyticsData();
        // return NextResponse.json(data);
        // console.log('data in ga handler', data)
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        // return NextResponse.json({ error: "无法获取数据" }, { status: 500 });
        // console.log('return err', error)
        res.status(400).json({ success: false });
      }
}

// const getVisitorData = async () => {
//     try {
//     const data = await getAnalyticsData();
//     return NextResponse.json(data);
//     } catch (error) {
//     return NextResponse.json({ error: "无法获取数据" }, { status: 500 });
//     }
// }