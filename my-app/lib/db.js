import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// 检查环境变量
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/** 
 * 缓存 Mongoose 连接
 * 这是为了在开发模式中避免频繁重新连接
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // useNewUrlParser: true, // wtest
        // useUnifiedTopology: true, // wtest
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
// ~~~~~~~~~~
// import { MongoClient } from 'mongodb';

// let client;
// let clientPromise;

// const uri = process.env.MONGODB_URI || 'default_uri_for_debugging';;
// const options = {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // ssl: true, // 启用 SSL
//   // sslValidate: true, // 验证证书
//   // sslCA: [fs.readFileSync('path_to_CA_cert.crt')], // 可选，指定 CA 证书
// };

// console.log("MONGODB_URI:", process.env.MONGODB_URI); // wtest


// if (!uri) {
//   throw new Error('Please add your MongoDB URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // 在开发环境中使用全局变量保存客户端实例
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // 在生产环境中直接创建客户端实例
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;