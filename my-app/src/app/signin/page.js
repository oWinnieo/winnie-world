'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// export default function Signin() {
const Signin = () => {
    const searchParams = useSearchParams();
    const csrf = searchParams.get('csrf');
    const callbackUrl = searchParams.get('callbackUrl');
    const error = searchParams.get('error');

    return (
        <div>
            <p>CSRF参数值: {csrf}</p>
            <p>callbackUrl: {callbackUrl}</p>
            <p>error: {error}</p>
        </div>
    );
}

// 使用 Suspense 包裹组件
const WrappedSigninPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Signin />
        </Suspense>
    );
};

export default WrappedSigninPage;

// // 'use client'
// // import { useSearchParams } from 'next/navigation';

// export async function getServerSideProps(context) {
//     const { csrf } = context.query;
//     return {
//       props: {
//         csrfValue: csrf
//       }
//     };
//   }
  
// const Signin = async ({ csrfValue }) => {
    
//     // const queryObj = await query
//     // const searchParams = useSearchParams();
//     // const csrf = searchParams.get('csrf');
//     // wtest ?csrf=true
//     return (
//         <>
//             <p>This is Signin page.</p>
//             {/* <p>paramsObj: {paramsObj && JSON.stringify(paramsObj)}</p> */}
//             {/* <p>queryObj: {queryObj && JSON.stringify(queryObj)}</p> */}
//             <p>CSRF参数值: {csrfValue}</p>
//         </>
//     )
// }

// export default Signin