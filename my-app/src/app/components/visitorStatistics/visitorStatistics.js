// export const VisitorStatistics = () => {
//     return <p>VisitorStatistics inside wtest_here_fetch -- a2</p>
// }
'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // wtest ga useSession added
import './visitorStatistics.scss'

export const VisitorStatistics = () => {
    
    const [visitors, setVisitors] = useState({ today: 0, total: 0 });
    // console.log('before useEffect')
    useEffect(() => {
        fetch("/api/ga4visitors")
          .then((res) => res.json())
          .then((data) => {
            // console.log('data', data)
            // if (data?.rows?.length > 0) {
            //   setVisitors(parseInt(data.rows[0].metricValues[0].value, 10));
            // }
            setVisitors({ today: data.todayVisitors, total: data.totalVisitors })
          })
          .catch((error) => console.error("获取访客数据失败:", error));
    }, []);
    // // useEffect(() => {
    // //     async function fetchData() {
    // //     const res = await fetch("/api/visitors");
    // //     const data = await res.json();
    // //     setVisitors({
    // //         today: data.rows?.[0]?.metricValues?.[0]?.value || 0,
    // //         total: data.rows?.[1]?.metricValues?.[0]?.value || 0,
    // //     });
    // //     }
    // //     fetchData();
    // // }, []);
    return (
        <div className="area-visitors">
            <h3>Visitors</h3>
            {/* <div>过去 7 天的访问量: {visitors !== null ? JSON.stringify(visitors) : "加载中..."}</div> */}
            <p>Today: 12 {visitors.today}</p>
            <p>Total: 23 {visitors.total}</p>
        </div>
    )



    // const { data: session } = useSession();
    // const [data, setData] = useState(null);
    // console.log('session in visitorStatistics.js >>>', session)
    // useEffect(() => {
    //     async function fetchData () {
    //         if (session) {
    //             await fetch(`/api/analytics?token=${session.user.accessToken}`) // wtest session.accessToken -> session.user.accessToken
    //               .then((res) => res.json())
    //               .then((data) => setData(data));
    //               console.log('data after fetch', data)
    //         }
    //     }
    //     // fetchData() // wtest here 这里要get localStorage
    //   }, [session]);
    
    //   return (
    //     <div className="area-visitors">
    //       <h1>访客数据</h1>
    //       {data ? (
    //         <pre>{JSON.stringify(data, null, 2)}</pre>
    //       ) : (
    //         <p>加载中...</p>
    //       )}
    //     </div>
    //   );
}