import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import BookSearch from "./bookSearch";
import BorrowModal from "./borrowModal";
import { host } from "../../const";
const { confirm } = Modal;

const schoolName = "مكتبة مدرسة عوريف الثانوية للبنين";
export const bookClassList = [
  {
    value: "000",
    label: "المعارف العامة",
  },
  {
    value: "100",
    label: "الفلسفة وعلم النفس",
  },
  {
    value: "200",
    label: "الديانات",
  },
  {
    value: "300",
    label: "العلوم الإجتماعية",
  },
  {
    value: "400",
    label: "اللغات",
  },
  {
    value: "500",
    label: "العلوم الطبيعية",
  },
  {
    value: "600",
    label: "العلوم التطبيقية",
  },
  {
    value: "700",
    label: "الفنون الجميلة",
  },
  {
    value: "800",
    label: "الآداب",
  },
  {
    value: "900",
    label: "التاريخ والجغرافيا",
  },
];
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
    class: string;
    bookName: string;
    authorName: string;
    bookID: number;
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
      width: "8%",
    },
    {
      title: "التصنيف",
      width: "12%",
      render: (record: any) => {
        let classNumber: any = record.classNumber / 100;
        return (
          <div>
            {record.classNumber !== null && record.classNumber !== undefined
              ? bookClassList[classNumber].label
              : ""}
          </div>
        );
      },
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

  const handleSearchClick = (filters: {
    class: any;
    bookName: any;
    authorName: any;
    bookID: any;
  }) => {
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
        }&authorName=${filters?.authorName}&class=${filters?.class}&bookID=${
          filters?.bookID
        }`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((results) => {
          setData(results.result);
          setTotal(results.total);
        });
    };
    fetchBooks();
  }, [
    filters?.bookName,
    filters?.authorName,
    filters?.class,
    filters?.bookID,
    tableParams?.pagination,
  ]);

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
      <div className="container">
        <div className="vertical-center">
          <h2>{schoolName}</h2>
        </div>
      </div>
      <BookSearch handleBookSearch={handleSearchClick} />
      <Table
        columns={columns}
        rowKey={(record: any) => record._id}
        dataSource={data}
        pagination={{ current: tableParams.pagination.current, total: total }}
        loading={loading}
        onChange={handleTableChange}
        direction="rtl"
        style={{ margin: "2vh 6vw" }}
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
