import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { userList, user } from "../../../shared/reqUrl";
import { getData, deleteData } from "../../../shared/services/http.service";
import DataTable from "react-data-table-component";
import { showErrorToaster, showsuccessToaster } from "../../../shared/services/error.handle.service";


export const User = () => {
  const initPage = {
    recordPerPage: 10,
    totalRecords: 0,
    currentPage: 0,
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState(initPage);
  const [user_name, setUser_name] = useState('')

  useEffect(() => {
    fetchData(pageData);
  }, [pageData.recordPerPage, pageData.currentPage, user_name]);

  const fetchData = async (pageData) => {
    const reqObj = {
      recordPerPage: pageData.recordPerPage,
      pageNumber: pageData.currentPage,
    };

    if(user_name) reqObj.user_name = user_name

    getData(userList, reqObj)
      .then(({ success, result: { data, totalRecords } }) => {
        if (success) {
          console.log("users data : ", data);
          setData(data);
          setPageData({ ...pageData, totalRecords });
          setLoading(false);
        }
      })
      .catch(({ response: { data } }) => {
        showErrorToaster(data);
      });
  };

  const handlePageChange = (page) => {
    const PageData = { ...pageData, currentPage: page };
    fetchData(PageData);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPageData({ ...pageData, recordPerPage: newPerPage });
  };

  const deleteUser = (user_id) => {
    console.log("delete user : ", user_id);
    setLoading(true);

    deleteData(user, { user_id })
      .then(({ success, message }) => {
        if (success) {
          fetchData(pageData);
          showsuccessToaster(message);
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        setLoading(true);
      });
  };

  const searchByName = (e) => {
    if (e.key === "Enter") {
      console.log("e.target.value : ", e.target.value);
      setUser_name(e.target.value );
      fetchData(pageData);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="row">
          <div className="col">
            <button className="btn btn-info">
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-danger"
              onClick={() => deleteUser(row.id)}
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        </div>
      ),
    },
    {
      name: "History",
      selector: (row) => (
        <div>
          <button className="btn btn-secondary">View</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid p-5">
        <div className="card">
          <div className="row d-flex justify-content-center p-3 pt-4">
            <input type="text" className="col-2 form-control login-input" placeholder="Search by name"
            onKeyDown={searchByName} />
          </div>
        </div>
      {!loading ? (
        <div className="pt-5">
          <div className="card">
            <DataTable
            theme="solarized"
              title="User list"
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              paginationServer
              paginationTotalRows={pageData.totalRecords}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />
          </div>
        </div>
      ) : (
        <div className="row d-flex justify-content-sm-center">
          <div className="col-md-6">
            <Oval height="100" width="100" color="white" ariaLabel="loading" />
          </div>
        </div>
      )}
    </div>
  );
};
