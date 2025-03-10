'use client'
import { useEffect, useState } from "react";
import './visitorStatistics.scss'

export const VisitorStatistics = () => {
    const [visitors, setVisitors] = useState({ today: 0, total: 0 });

    // useEffect(() => {
    //     async function fetchData() {
    //     const res = await fetch("/api/visitors");
    //     const data = await res.json();
    //     setVisitors({
    //         today: data.rows?.[0]?.metricValues?.[0]?.value || 0,
    //         total: data.rows?.[1]?.metricValues?.[0]?.value || 0,
    //     });
    //     }
    //     fetchData();
    // }, []);
    return (
        <div className="area-visitors">
            <h3>Visitors</h3>
            <p>Today: 111222 {visitors.today}</p>
            <p>Total: 232323 {visitors.total}</p>
        </div>
    )
}