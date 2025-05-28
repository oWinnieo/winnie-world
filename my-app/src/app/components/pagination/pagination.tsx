// components/Pagination.tsx
'use client';
import './pagination.scss'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    limit,
    onLimitChange
}: PaginationProps) => {
  return (
    <div className="pagination" style={{ marginTop: 20 }}>
        <div className="opt">
            <input
                className="input-limit"
                type="number"
                min={1}
                value={limit}
                onChange={(e) => {
                const newLimit = parseInt(e.target.value || '1');
                onLimitChange(newLimit);
                onPageChange(1); // 每次修改条数时跳到第一页
                }}
                style={{ width: 60, marginLeft: 8 }}
                /> Items/Page
        </div>
        <button className="btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0}>
        Prev Page
        </button>{' '}
        <span>
        &lt; Page {currentPage}  / Total {totalPages} {totalPages >= 2 ? 'Pages' : 'Page'} &gt;
        </span>{' '}
        <button className="btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
        Next Page
        </button>
    </div>
  );
}