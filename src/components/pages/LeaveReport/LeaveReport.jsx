// modules
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
// base component
import { encrypt } from "../../../shared/components/base/base";
// servives and variables
import { getData } from "../../../shared/services/http.service";
import { CONSTANTS } from "../../../shared/services/constant.service";
import { showErrorToaster } from "../../../shared/services/error.handle.service";
import { leavesList } from "../../../shared/reqUrl";
import {
  months,
  allYears,
  leavesreportHeaders,
} from "../../../shared/global-data/Global.data";

const initSearchObj = {
  user_name: "",
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

const initPage = {
  recordPerPage: 10,
  totalRecords: 0,
  currentPage: 0,
};

export const LeaveReport = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState(initPage);
  const [searchObj, setSearchObj] = useState(initSearchObj);

  useEffect(() => {
    fetchData(pageData);
  }, [pageData.recordPerPage, pageData.currentPage, searchObj]);

  const fetchData = async (pageData) => {
    const reqObj = {
      recordPerPage: pageData.recordPerPage,
      pageNumber: pageData.currentPage,
    };

    if (searchObj.user_name) reqObj.user_name = searchObj.user_name;
    if (searchObj.month) reqObj.month = searchObj.month;
    if (searchObj.year) reqObj.year = searchObj.year;

    getData(leavesList, reqObj)
      .then(({ success, result: { data, totalRecords } }) => {
        if (success) {
          setData(data);
          setPageData((prev) => ({ ...prev, totalRecords }));
          setLoading(false);
        }
      })
      .catch(({ response: { data } }) => {
        showErrorToaster(data);
      });
  };

  const handlePageChange = (currentPage) => {
    const PageData = { ...pageData, currentPage };
    fetchData(PageData);
  };

  const handlePerRowsChange = async (recordPerPage) => {
    setPageData((prev) => ({ ...prev, recordPerPage }));
  };

  const handleOnYearChange = (e) => {
    console.log(e.target.value);
    setSearchObj({ ...searchObj, year: e.target.value });
    fetchData(pageData);
  };

  const handleOnMonthChange = (e) => {
    // setSearchObj({...searchObj, year})
    console.log(e.target.value);
    setSearchObj({ ...searchObj, month: e.target.value });
    fetchData(pageData);
  };

  const searchByName = (e) => {
    if (e.key === "Enter") {
      setSearchObj((prev) => ({ ...prev, user_name: e.target.value }));
      fetchData(pageData);
    }
  };

  const onLeavesDetails = (id) => {
    const userId = encrypt(id);
    navigate({
      pathname: CONSTANTS.navigateToLeavesDetails,
      search: `?userId=${userId}`,
    });
  };

  const csvreport = {
    data,
    headers: leavesreportHeaders,
    filename: "Leaves_Report.csv",
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.users.name,
    },
    {
      name: "Total leaves",
      selector: (row) => row.total_leaves,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => onLeavesDetails(row.user_id)}
          >
            View detail
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid p-5">
      <div className="card">
        <fieldset className="row p-4">
          <label className="col">
            <select
              id="month"
              onChange={handleOnMonthChange}
              name="users-list-select"
              className="form-control login-input"
              value={searchObj.month}
            >
              {months.map((month) => {
                return (
                  <option key={month.id} value={month.id}>
                    {month.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="col">
            <select
              id="year"
              onChange={handleOnYearChange}
              name="users-list-select"
              className="form-control login-input"
              value={searchObj.year}
            >
              {allYears().map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="ngx-filter-ref" className="col">
            <input
              id="ngx-filter-ref"
              className="form-control login-input"
              type="text"
              placeholder="Search by Name"
              onKeyDown={searchByName}
            />
          </label>
          <label htmlFor="ngx-filter-ref" className="col pt-2">
            <CSVLink className="btn btn-success" {...csvreport}>
              Export CSV
            </CSVLink>
          </label>
        </fieldset>
      </div>
      {!loading ? (
        <div className="pt-5">
          <div className="card">
            <DataTable
              theme="solarized"
              title="Leaves report"
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
