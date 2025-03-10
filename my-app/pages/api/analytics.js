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