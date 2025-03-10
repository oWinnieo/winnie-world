/* wtest ga 1 *
import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const VIEW_ID = "10366737933"; // GA4 资源 ID

async function getAuthClient() {
  console.log('--->>> 1')
  const keyFile = path.join(process.cwd(), "credentialsForGA-winnie-world-df046111b4bf.json");
  console.log('--->>> 2 keyFile', keyFile)
  const keyFileContents = await fs.readFile(keyFile, "utf8");
  console.log('--->>> 3')
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(keyFileContents),
    scopes: SCOPES,
  });
  console.log('--->>> 4')

  return auth.getClient();
}

export async function getAnalyticsData() {
    console.log('fun getAnalyticsData')
  const authClient = await getAuthClient();
  console.log('fun 1')
  const analyticsData = google.analyticsdata({ version: "v1beta", auth: authClient });
  console.log('>>> before VIEW_ID', VIEW_ID)
  const response = await analyticsData.properties.runReport({
    property: `properties/${VIEW_ID}`,
    requestBody: {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    },
  });
  console.log('>>> after')

  return response.data;
}
/* /wtest ga 1 */

/* wtest ga 2 *
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

// 初始化 Google Analytics Data API 客户端
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Google 服务账号 JSON 路径
});
const PROPERTY_ID = "10366737933"; // GA4 资源 ID
// const PROPERTY_ID = process.env.GA4_PROPERTY_ID; // 你的 GA4 Property ID

export default async function handler () { // GET
  console.log('ga handler ------> 1')
  try {
    // 调用 GA4 API 获取数据
    console.log('ga handler ------> 2')
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
      dimensions: [{ name: "city" }],
    });

    return NextResponse.json(response);
    console.log('ga handler ------> 3')
    // res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log('return err ??', error)
    // res.status(400).json({ success: false });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/* /wtest ga 2 */

/* wtest ga 3 */
import { google } from 'googleapis';

async function getAnalyticsData(token) {
  const analyticsData = google.analyticsdata('v1beta');

  // 使用 OAuth2 访问 GA4 数据
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  const response = await analyticsData.properties.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`, // 替换为 GA4 Property ID
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
    dimensions: [{ name: "city" }],
    auth: oauth2Client,
  });

  return response.data;
}

export default async function GET(req, res) {
  console.log('ga get ---> 2')
  const { token } = req.query;  // 获取从前端传递的用户令牌

  try {
    console.log('ga get ---> 2')
    const analyticsData = await getAnalyticsData(token);
    console.log('ga get ---> 3')
    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
/* /wtest ga 3 */