"use client";

import { Fragment } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({
  totalPages,
  currentPage,
  onClickPage,
}: {
  totalPages: number;
  currentPage: number;
  onClickPage: (page: number) => void;
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onClickPage(currentPage - 1)}
        className="min-w-8 px-3 rounded-full hover:bg-slate-300"
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {totalPages > 7 ? (
        currentPage <= 5 ? (
          <Fragment>
            {new Array(5).fill(0).map((_, i) => (
              <button
                onClick={() => onClickPage(i + 1)}
                className="min-w-8 px-3 rounded-full hover:bg-slate-300"
                key={i}
              >
                {i + 1}
              </button>
            ))}
            <div>...</div>
            <button
              onClick={() => onClickPage(totalPages)}
              className="min-w-8 px-3 rounded-full hover:bg-slate-300"
            >
              {totalPages}
            </button>
          </Fragment>
        ) : currentPage >= totalPages - 5 ? (
          <Fragment>
            <button
              onClick={() => onClickPage(1)}
              className="min-w-8 px-3 rounded-full hover:bg-slate-300"
            >
              1
            </button>
            <div>...</div>
            {new Array(5).fill(0).map((_, i) => (
              <button
                onClick={() => onClickPage(totalPages - 4 + i)}
                className="min-w-8 px-3 rounded-full hover:bg-slate-300"
                key={i}
              >
                {totalPages - 4 + i}
              </button>
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <button
              onClick={() => onClickPage(1)}
              className="min-w-8 px-3 rounded-full hover:bg-slate-300"
            >
              1
            </button>
            <div>...</div>
            {new Array(3).fill(0).map((_, i) => (
              <button
                onClick={() => onClickPage(currentPage - 1 + i)}
                className="min-w-8 px-3 rounded-full hover:bg-slate-300"
                key={i}
              >
                {currentPage - 1 + i}
              </button>
            ))}
            <div>...</div>
            <button
              onClick={() => onClickPage(totalPages)}
              className="min-w-8 px-3 rounded-full hover:bg-slate-300"
            >
              {totalPages}
            </button>
          </Fragment>
        )
      ) : (
        new Array(totalPages).fill(0).map((_, i) => (
          <button
            onClick={() => onClickPage(i + 1)}
            className="min-w-8 px-3 rounded-full hover:bg-slate-300"
            key={i}
          >
            {i + 1}
          </button>
        ))
      )}
      <button
        onClick={() => onClickPage(currentPage + 1)}
        className="min-w-8 px-3 rounded-full hover:bg-slate-300"
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
