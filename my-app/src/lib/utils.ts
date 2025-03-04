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
  return he.encode(str)
}
export const htmlDecode = (str: string) => {
  const escapedHTML = str ? he.decode(str) : ''
  const parsedHTML = ReactHtmlParser(escapedHTML)
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
  console.log('htmlParsed', htmlParsed)
  if (propsList.length === 0) {
    return ''
  }
  const htmlDecodedStr = propsList.length > 1 ? propsList.reduce((a, b) => {
    console.log('a', a, 'b', b)
    if (propsList.length === 1) debugger;
    return a.children ? a.children[0] : a + b.children[0]
  }) : propsList[0].children ? propsList[0].children[0] : propsList[0]
  const lenLimit = 20
  const htmlDecodedStrStringed = String(htmlDecodedStr)
  return htmlDecodedStrStringed.length > lenLimit ? htmlDecodedStrStringed.slice(0, lenLimit) + '...' : htmlDecodedStrStringed
}
// wtest htmlDecodeSlice(htmlDecode(item.content, 'list'))

export const html2txt = (html : string) => {
  // 提取文本内容
  const htmlRes = convert(he.decode(html))
  const lenLimit = 200
  return htmlRes.length > lenLimit ? htmlRes.slice(0, lenLimit) + '...' : htmlRes
}
