'use client'
// components/MyProvider.js
import React, { useState } from 'react';
import MyContext from '../contexts/MyContext';

const MyProvider = ({ children }) => {
    const [data, setData] = useState('初始数据');

    return (
        <MyContext.Provider value={{ data, setData }}>
            <p>My Provider</p>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;