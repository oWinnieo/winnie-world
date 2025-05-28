1. MongoDB 数据分页查询逻辑

MongoDB 分页的关键是使用 .skip() 和 .limit()：

// lib/db.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
export const db = client.db('your_db_name');

2. 创建分页 API 接口：app/api/items/route.ts

// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');

  const collection = db.collection('items');
  const totalItems = await collection.countDocuments();

  const items = await collection
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return NextResponse.json({
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  });
}

~~~
// pages/api/items.js
import dbConnect from '@/lib/mongoose';
import Item from '@/models/Item';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');

    try {
      const totalItems = await Item.countDocuments();
      const items = await Item.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return res.status(200).json({
        items,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error', detail: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}


3. 前端获取分页数据

'use client';

import { useEffect, useState } from 'react';

interface Item {
  _id: string;
  name: string;
}

interface PaginationResponse {
  items: Item[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export default function PaginatedItems() {
  const [data, setData] = useState<PaginationResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/items?page=${page}&limit=5`)
      .then(res => res.json())
      .then(setData);
  }, [page]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Items Page {data.currentPage}</h1>
      <ul>
        {data.items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          上一页
        </button>{' '}
        <span>
          第 {data.currentPage} 页 / 共 {data.totalPages} 页
        </span>{' '}
        <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}>
          下一页
        </button>
      </div>
    </div>
  );
}

总结
	•	API 接口通过 page 和 limit 查询 MongoDB 并返回分页数据
	•	前端根据页码请求 /api/items 并展示数据
	•	你可以将分页状态存入 Redux（如之前那样），让多个组件共享页码状态
