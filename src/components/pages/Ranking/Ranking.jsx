import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { ranking } from "../../../shared/reqUrl";
import { getData } from "../../../shared/services/http.service";
import DataTable from "react-data-table-component";
import {
  months,
  allYears,
  rankingReportReaders,
} from "../../../shared/global-data/Global.data";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../../shared/services/constant.service";
import { encrypt } from "../../../shared/components/base/base";
import { CSVLink } from "react-csv";
import { showErrorToaster } from "../../../shared/services/error.handle.service";

export const Ranking = () => {
  let navigate = useNavigate();
  const initSearchObj = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };

  const initPage = {
    recordPerPage: 10,
    totalRecords: 0,
    currentPage: 0,
  };

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

    if (searchObj.year) reqObj.year = searchObj.year;
    if (searchObj.month) reqObj.month = searchObj.month;
    if (searchObj.user_name) reqObj.user_name = searchObj.user_name;

    console.log("searchObj : ", searchObj);

    getData(ranking, reqObj)
      .then(({ success, result: { data, totalRecords } }) => {
        if (success) {
          console.log("ranking data : ", data);

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
      console.log("e.target.value : ", e.target.value);
      setSearchObj({ ...searchObj, user_name: e.target.value });
      fetchData(pageData);
    }
  };

  const navigateToAwatd = (id) => {
    const userId = encrypt(id);
    navigate({
      pathname: CONSTANTS.navigateToRankingAward,
      search: `?userId=${userId}&month=${searchObj.month}&year=${searchObj.year}`,
    });
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
      name: "Total hours",
      selector: (row) => row.total_hours,
    },
    {
      name: "Efficiency",
      selector: (row) => row.efficiency,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => navigateToAwatd(row.user_id)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const csvreport = {
    data,
    headers: rankingReportReaders,
    filename: "Ranking_Report.csv",
  };

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
              title="Ranking"
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
        <div className="d-flex align-items-center justify-content-center">
          <div className="" style={{ height: "1850px" }}>
            <Oval height="100" width="100" color="white" ariaLabel="loading" />
          </div>
        </div>
      )}
    </div>
  );
};
