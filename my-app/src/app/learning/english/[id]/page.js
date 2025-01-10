// export const dynamic = "force-dynamic";

// export default function ProductPage({ params }) {
//     return <div>Dynamic Product ID: {params.id}</div>;
// }
export default async function Post ({ params }) {
    const { id } = await params
    return (
        <div>
         <h1>Post of English Learning: id, {id}</h1>
         {/* <div>{JSON.stringify(params)}</div>  */}
        </div>
    )
}

// // app/products/[id]/page.js
// export async function generateStaticParams() {
//     // 模拟从 API 获取所有产品 ID
//     const products = await fetch('https://api.example.com/products').then((res) => res.json());

//     // 返回静态参数列表
//     return products.map((product) => ({
//         id: product.id.toString(),
//     }));
// }

// export default function ProductPage({ params }) {
//     return <div>Product ID: {params.id}</div>;
// }