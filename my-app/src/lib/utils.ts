import React from 'react'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
/* html */
import he from 'he';
import ReactHtmlParser from 'react-html-parser';
import { convert } from 'html-to-text';
/* /html */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const htmlEncode = (str: string) => {
  return he.encode(str) // 转义html标签
}
export const htmlDecode = (str: string) => {
  const escapedHTML = str ? he.decode(str) : '' // 还原html标签
  const parsedHTML = ReactHtmlParser(escapedHTML) // 安全渲染html
  return parsedHTML
}

export const htmlSimpleDecode = (str: string) => {
  return str ? he.decode(str) : ''
}

const getPropsFromReactNodes = (nodes: React.ReactNode[]) => {
  const propsArray: any[] = [];
  nodes.forEach((node) => {
      if (React.isValidElement(node)) {
          // 如果是 ReactElement 类型，则获取其 props 内容
          propsArray.push(node.props);
      } else {
        propsArray.push(node)
      }
  });
  return propsArray;
};

export const htmlDecodeSlice = (htmlParsed: React.ReactNode[]) => {
  const propsList = getPropsFromReactNodes(htmlParsed);
  if (propsList.length === 0) {
    return ''
  }
  const htmlDecodedStr = propsList.length > 1 ? propsList.reduce((a, b) => {
    if (propsList.length === 1) debugger;
    return a.children ? a.children[0] : a + b.children[0]
  }) : propsList[0].children ? propsList[0].children[0] : propsList[0]
  const lenLimit = 20
  const htmlDecodedStrStringed = String(htmlDecodedStr)
  return htmlDecodedStrStringed.length > lenLimit ? htmlDecodedStrStringed.slice(0, lenLimit) + '...' : htmlDecodedStrStringed
}

export const html2txt = (html : string) => { // 提取文本内容
  return html ? convert(he.decode(html)) : ''
}

export const strSliced = (str: string, lenLimit: number) => {
  return str.length > lenLimit ? str.slice(0, lenLimit) + '...' : str
}

export const timeFormatter = (time: string) => {
  // const timeOri = new Date(time)
  // const timeFormatted = timeOri.toLocaleString('zh-CN', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minite: '2-digit'
  // })

  const timeFormatted = time ? new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai", // 时区可改
    }).format(new Date(time)) : '?';

  return timeFormatted
}

export const titleDisplay = ({ name, suffix }: { name: string, suffix: string}) => {
  // scope: colLearning, // wtest
  const nameFormat = name.charAt(0).toUpperCase() + name.slice(1)
  const suffixFormat = suffix.charAt(0).toUpperCase() + suffix.slice(1)
  return `${nameFormat} ${suffixFormat}`
}