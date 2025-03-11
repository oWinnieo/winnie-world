import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const VIEW_ID = process.env.GA4_PROPERTY_ID; // 替换为你的 GA4 View ID
const KEY_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS; // JSON 密钥文件路径

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: SCOPES,
    });

    const analyticsData = google.analyticsdata({
      version: "v1beta",
      auth,
    });

    const today = new Date().toISOString().split("T")[0];

    // 获取今日访客数 & 总访客数
    const response = await analyticsData.properties.runReport({
      property: `properties/${VIEW_ID}`,
      requestBody: {
        dateRanges: [
          { startDate: today, endDate: today },
          { startDate: "2005-01-01", endDate: "today" },
        ],
        metrics: [{ name: "activeUsers" }],
      },
    });

    const todayVisitors = response.data?.rows?.[0]?.metricValues?.[0]?.value || "0";
    const totalVisitors = response.data?.rows?.[1]?.metricValues?.[0]?.value || "0";

    res.status(200).json({ todayVisitors, totalVisitors });
  } catch (error) {
    console.error("GA API Error:", error);
    res.status(500).json({ error: "无法获取访客数据" });
  }
}