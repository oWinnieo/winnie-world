'use client'
import Link from 'next/link'
import { html2txt, strSliced } from '@/lib/utils';
export const UserLike = ({
    itemUrl,
    item
}) => {
    return <li>
        <Link href={itemUrl}>{item?.belongToItemInfo?.content && strSliced(html2txt(item.belongToItemInfo.content), 200)}</Link></li>
}