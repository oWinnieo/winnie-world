// import clientPromise from '../../lib/mongodb';

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_URI); // wtest MONGODB_URI / MONGODB_DB

//     const users = await db.collection('users').find({}).toArray();

//     res.status(200).json({ users });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Unable to fetch data' });
//   }
// }