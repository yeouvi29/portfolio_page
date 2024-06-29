"use client";

import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ArrowButton = ({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "min-w-8 aspect-square flex justify-center items-center rounded-full hover:bg-slate-200",
        disabled && "cursor-default opacity-50 hover:bg-transparent"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const PaginationButton = ({
  isActive,
  pageNumber,
  onClickButton,
}: {
  isActive: boolean;
  pageNumber: number;
  onClickButton: (page: number) => void;
}) => {
  return (
    <button
      onClick={() => onClickButton(pageNumber)}
      className={clsx(
        "min-w-8 aspect-square flex justify-center items-center rounded-full hover:bg-slate-200",
        isActive &&
          "bg-blue-300 bg-opacity-30 hover:bg-blue-300 hover:bg-opacity-50 text-blue-600"
      )}
    >
      {pageNumber}
    </button>
  );
};

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
    <div className="text-sm flex gap-2 items-center">
      <ArrowButton
        onClick={() => {
          onClickPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </ArrowButton>
      {totalPages > 7 ? (
        currentPage <= 5 ? (
          <Fragment>
            {new Array(5).fill(0).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationButton
                  key={pageNumber}
                  onClickButton={() => onClickPage(pageNumber)}
                  isActive={currentPage === pageNumber}
                  pageNumber={pageNumber}
                />
              );
            })}
            <div>...</div>
            <PaginationButton
              onClickButton={() => onClickPage(totalPages)}
              isActive={currentPage === totalPages}
              pageNumber={totalPages}
            />
          </Fragment>
        ) : currentPage >= totalPages - 5 ? (
          <Fragment>
            <PaginationButton
              onClickButton={() => onClickPage(1)}
              isActive={currentPage === 1}
              pageNumber={1}
            />
            <div>...</div>
            {new Array(5).fill(0).map((_, i) => {
              const pageNumber = totalPages - 4 + i;
              return (
                <PaginationButton
                  key={pageNumber}
                  onClickButton={() => onClickPage(pageNumber)}
                  isActive={currentPage === pageNumber}
                  pageNumber={pageNumber}
                />
              );
            })}
          </Fragment>
        ) : (
          <Fragment>
            <PaginationButton
              key={1}
              onClickButton={() => onClickPage(1)}
              isActive={currentPage === 1}
              pageNumber={1}
            />
            <div>...</div>
            {new Array(3).fill(0).map((_, i) => {
              {
                const pageNumber = currentPage - 1 + i;
                return (
                  <PaginationButton
                    key={pageNumber}
                    onClickButton={() => onClickPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                    pageNumber={pageNumber}
                  />
                );
              }
            })}
            <div>...</div>
            <PaginationButton
              key={totalPages}
              onClickButton={() => onClickPage(totalPages)}
              isActive={currentPage === totalPages}
              pageNumber={totalPages}
            />
          </Fragment>
        )
      ) : (
        new Array(totalPages).fill(0).map((_, i) => {
          {
            const pageNumber = 1 + i;
            return (
              <PaginationButton
                key={pageNumber}
                onClickButton={() => onClickPage(pageNumber)}
                isActive={currentPage === pageNumber}
                pageNumber={pageNumber}
              />
            );
          }
        })
      )}
      <ArrowButton
        onClick={() => {
          onClickPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </ArrowButton>
    </div>
  );
};

export default Pagination;
