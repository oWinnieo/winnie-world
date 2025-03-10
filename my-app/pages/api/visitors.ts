import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import credentials from '../../credentialsForGA-winnie-world-df046111b4bf.json'; // 替换为你的服务账号 JSON 文件路径

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
// const analyticsreporting = google.analyticsdata("v1beta"); // wtest backup

const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  SCOPES
);

const analyticsreporting = google.analyticsdata({
  version: "v1beta",
  auth
});

console.log('auth credentials:', credentials.client_email); // 确保正确
// console.log('auth initialized:', auth);




// const response = await analyticsData.properties.runReport({
        //     property: `properties/G-XXXXXXXXXX`,  // 替换为你的 GA4 属性 ID
        //     requestBody: {
        //       dimensions: [{ name: 'date' }],
        //       metrics: [{ name: 'activeUsers' }],
        //       dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        //     },
        //   });

async function getVisitors() {
  console.log("Starting getVisitors function...");
  try {
    console.log('au try')
    await auth.authorize();
    console.log("Auth successful!");
  } catch (err) {
    console.log('au ? err', err)
  }
  
  console.log('auth.email >>>', auth.email)
// console.log('analyticsreporting', analyticsreporting.properties.runReport)
  try {
    console.log('auth.email >>> 1')
    const res = await analyticsreporting.properties.runReport({
      // auth, // wtest backup
      property: "properties/10366737933", // 你的 GA4 属性 ID
      requestBody: {
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      },
    })
    // .then(ress => {
      // console.log('ress', ress)
    // });
    console.log('res ga -----------------> wtest here', res) // wtest G-9QTB7YVB49
  
    // return res.data;
    return {data: 'wtest ga on waiting try ~~~'}
  } catch (err) {
    console.log('auth.email >>> 2')
    return {data: 'wtest ga on waiting catch ---', err}
  }
  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('ah')
    const data = await getVisitors();
    // const data = {aa: 1}
    console.log('data', data)

    res.status(200).json(data);
  } catch (error) {
    console.log('?? 2')
    res.status(500).json({ error: "Failed to fetch data" });
  }
}