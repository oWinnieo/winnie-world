import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

// 加载OAuth客户端配置
const OAUTH_REDIRECT_URI_FULL = `${process.env.NEXTAUTH_URL}${process.env.OAUTH_REDIRECT_URI}`

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID, // wtest OAUTH_CLIENT_ID,    // 你的 OAuth 客户端 ID
  process.env.GOOGLE_CLIENT_SECRET, // wtest OAUTH_CLIENT_SECRET, // 你的 OAuth 客户端密钥
  //   process.env.// wtest OAUTH_REDIRECT_URI  // 重定向 URI
  OAUTH_REDIRECT_URI_FULL
);
// console.log('oauth2Client', oauth2Client)

const analyticsreporting = google.analyticsdata({
  version: "v1beta",
  auth: oauth2Client
});

async function getVisitors() {
  // console.log("Starting getVisitors function...");

  // 使用授权获取访问令牌
  const token = await oauth2Client.getAccessToken();
  oauth2Client.setCredentials({ access_token: token.token });

  try {
    const res = await analyticsreporting.properties.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`, // 你的 GA4 属性 ID
      requestBody: {
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      },
    });
    // console.log('GA Response: ', res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching GA data", err);
    return { error: 'Failed to fetch data' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getVisitors();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API handler", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}