import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]"; // 确保路径正确

export default async function handler(req, res) {
    // const session = await getServerSession(authOptions);

    if (!session) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, session: {
      'wtest': '?'
    } });
}