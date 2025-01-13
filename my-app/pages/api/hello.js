// import type { NextApiRequest, NextApiResponse } from "next";
// const mongoose = require('mongoose');

// // const uri = 'mongodb://<username>:<password>@<hostname>:<port>/<database>';
// const uri = 'mongodb://learner1:123123@23.158.24.24:22333/learning_english';

// // 配置 SSL/TLS 参数
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   ssl: true,
//   sslCA: '/path/to/ca.pem', // CA 证书文件路径
//   sslCert: '/path/to/client-cert.pem', // 客户端证书（可选）
//   sslKey: '/path/to/client-key.pem'    // 客户端密钥（可选）
// };

// mongoose.connect(uri, options)
//   .then(() => {
//     console.log('Connected to MongoDB with SSL!');
//   })
//   .catch(err => {
//     console.error('SSL connection error:', err);
//   });
// ~~~~~~~~~~~
// const mongoose = require('mongoose');
// // console.log('mongoose', JSON.stringify(mongoose))

// // wtest mongodb://<username>:<password>@<hostname>:<port>/<database>
// mongoose.connect('mongodb://learner1:123123@23.158.24.24:22333/learning_english', {
//   ssl: true,
//   sslCA: '/path/to/ca.pem',
//   sslCert: '/path/to/client-cert.pem', // 如果需要双向认证
//   sslKey: '/path/to/client-key.pem'   // 如果需要双向认证
// }).then(() => {
//   console.log('Connected successfully!');
// }).catch(err => {
//   console.error('Connection error:', err);
// });
// ~~~~~~~~~~~~~~
// import clientPromise from '../../lib/db';

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_URI); // wtest MONGODB_URI / MONGODB_DB
//     console.log('client', JSON.stringify(client))
//     console.log('db', JSON.stringify(db))
//     // debugger;
//     // 从数据库中读取集合的数据
//     const collection = db.collection('test'); // 替换为你的集合名
//     const documents = await collection.find({}).toArray();

//     res.status(200).json({ success: true, data: documents });
//   } catch (error) {
//     console.error(error);
//     console.log('wtest', JSON.stringify(error))
//     res.status(500).json({ success: false, message: 'Error connecting to database' });
//   }
// }
// ~~~~~~~~~~
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// let client;
// let clientPromise;

// if (!uri) {
//   throw new Error('MONGODB_URI is not defined');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// clientPromise
//   .then(client => {
//     console.log('MongoDB connected successfully!');
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err.message);
//     console.error('Full error:', err);
//   });

// export default clientPromise;