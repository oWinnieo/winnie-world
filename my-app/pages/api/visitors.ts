import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import credentials from '../../credentialsForGA-winnie-world-df046111b4bf.json'; // 替换为你的服务账号 JSON 文件路径

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const analyticsreporting = google.analyticsdata("v1beta");

// const response = await analyticsData.properties.runReport({
        //     property: `properties/G-XXXXXXXXXX`,  // 替换为你的 GA4 属性 ID
        //     requestBody: {
        //       dimensions: [{ name: 'date' }],
        //       metrics: [{ name: 'activeUsers' }],
        //       dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        //     },
        //   });

async function getVisitors() {
  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES
  );
  console.log('auth', auth)
console.log('analyticsreporting', analyticsreporting.properties.runReport)
  
  // const res = await analyticsreporting.properties.runReport({
  //   auth,
  //   property: "properties/G-9QTB7YVB49", // 你的 GA4 属性 ID
  //   requestBody: {
  //     dateRanges: [{ startDate: "today", endDate: "today" }],
  //     metrics: [{ name: "activeUsers" }],
  //   },
  // });
  // console.log('res ga -----------------> wtest here', res) // wtest G-9QTB7YVB49

  // return res.data;
  return {data: 'wtest ga on waiting'}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('ah')
    const data = await getVisitors();
    // const data = {aa: 1}

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}