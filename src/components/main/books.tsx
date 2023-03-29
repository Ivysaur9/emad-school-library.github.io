import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import BookSearch from "./bookSearch";
import BorrowModal from "./borrowModal";

const { confirm } = Modal;
const host = "https://emad-library.onrender.com";
// const host = 'http://localhost:5500';

interface DataType {
  title: string;
  authorName: string;
  schoolCode: number;
  bookID: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const BooksList: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [total, setTotal] = useState<number>();
  const [filters, setFilters] = useState<{
    bookName: string;
    authorName: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });
  const [openBorrowModal, setOpenBorrowModal] = useState<Boolean>(false);
  const [selectedBook, setSelectedBook] = useState<any>();

  const columns: ColumnsType<DataType> = [
    {
      title: "الرقم",
      dataIndex: "bookID",
      width: "10%",
    },
    {
      title: "العنوان",
      dataIndex: "title",
      width: "25%",
    },
    {
      title: "اسم المؤلف",
      dataIndex: "authorName",
      width: "25%",
    },
    // {
    //   title: "المدرسة",
    //   dataIndex: "schoolCode",
    //   width: "15%",
    // },
    // {
    //   title: "اجراءات",
    //   dataIndex: "",
    //   key: "x",
    //   render: (text, record) => (
    //     <>
    //       <Button
    //         shape="round"
    //         style={{ margin: "6px", color: "green", borderColor: "green" }}
    //         onClick={() => {
    //           handleBorrowClick(record);
    //         }}
    //       >
    //         إعارة
    //       </Button>
    //       <Button
    //         shape="round"
    //         style={{ margin: "6px", color: "blue", borderColor: "blue" }}
    //         onClick={() => {
    //           handleEditClick(record);
    //         }}
    //       >
    //         تعديل
    //       </Button>
    //       <Button
    //         shape="round"
    //         danger
    //         style={{ margin: "6px" }}
    //         onClick={() => {
    //           showDeleteBookConfirm(record);
    //         }}
    //       >
    //         حذف
    //       </Button>
    //     </>
    //   ),
    // },
  ];
  const success = (msg: String = "تمت العملية بنجاح") => {
    message.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg: String = "حدث خطأ ما") => {
    message.open({
      type: "error",
      content: msg,
    });
  };

  const handleSearchClick = (filters: { bookName: any; authorName: any }) => {
    setTableParams({
      pagination: {
        current: 1,
      },
    });
    setFilters(filters);
  };

  useEffect(() => {
    const fetchBooks = () => {
      fetch(
        `${host}/books?limit=${
          tableParams?.pagination?.pageSize || 20
        }&offset=${tableParams?.pagination?.current || 1}&bookName=${
          filters?.bookName
        }&authorName=${filters?.authorName}`,
        {
          method: "GET",
          // body: JSON.stringify({ title: "React POST Request Example" }),
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setData(results.result);
          setTotal(results.total);
          console.log(total);

          // setTableParams({
          //   ...tableParams,
          //   pagination: {
          //     ...tableParams.pagination,
          //     total: results.total,
          //     // 200 is mock data, you should read it from server
          //     // total: data.totalCount,
          //   },
          // });
        });
    };
    fetchBooks();
  }, [filters?.bookName, filters?.authorName, tableParams?.pagination]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>
    // sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      filters,
      // ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleBorrowClick = (record: any) => {
    setSelectedBook(record);
    setOpenBorrowModal(true);
  };

  const handleReturnClick = (record: any) => {};

  const handleEditClick = (record: any) => {};

  const showDeleteBookConfirm = (record: any) => {
    confirm({
      title: "هل أنت متأكد؟",
      // icon: <ExclamationCircleFilled />,
      content: record.title,
      okText: "نعم",
      okType: "danger",
      cancelText: "إلغاء",
      direction: "rtl",
      onOk() {
        deleteBook(record._id);
      },
    });
  };

  const deleteBook = async (id: String) => {
    setLoading(true);
    let result = await (
      await fetch(`${host}/books/${id}`, {
        method: "DELETE",
      })
    ).json();
    if (result.error) {
      error(result.error);
      setLoading(false);
    } else {
      let index = data.findIndex((element: any) => element._id === id);
      let newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      success();
      setLoading(false);
    }
  };

  return (
    <>
      <BookSearch handleBookSearch={handleSearchClick} />
      <Table
        columns={columns}
        rowKey={(record) => record.bookID}
        dataSource={data}
        pagination={{ current: tableParams.pagination.current, total: total }}
        loading={loading}
        onChange={handleTableChange}
        direction="rtl"
      />
      {openBorrowModal && (
        <BorrowModal
          bookID={selectedBook._id}
          bookName={selectedBook.bookName}
        />
      )}
    </>
  );
};

export default BooksList;
