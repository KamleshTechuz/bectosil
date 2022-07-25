//modules
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import DataTable from "react-data-table-component";

//  services
import { workingHoursReport } from "../../../shared/reqUrl";
import { getData } from "../../../shared/services/http.service";
import { months, allYears, workinHoursHeaders } from "../../../shared/global-data/Global.data";
import { showErrorToaster } from "../../../shared/services/error.handle.service";


// react-data-table colums
const columns = [
  {
    name: "Name",
    selector: (row) => row.users.name,
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
        <button className="btn btn-secondary">Edit</button>
      </div>
    ),
  },
];

const initSearchObj = {
  name: "",
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

const initPage = {
  recordPerPage: 10,
  totalRecords: 0,
  currentPage: 0,
};

export const WorkinHours = () => {
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

    if (searchObj.name) reqObj.name = searchObj.name;
    if (searchObj.month) reqObj.month = searchObj.month;
    if (searchObj.year) reqObj.year = searchObj.year;

    getData(workingHoursReport, reqObj)
      .then(({ success, result: { data, totalRecords } }) => {
        if (success) {
          console.log("workingHoursReport data : ", data);
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
    console.log(e.target.value);
    setSearchObj({ ...searchObj, month: e.target.value });
    fetchData(pageData);
  };

  const searchByName = (e) => {
    if (e.key === "Enter") {
      console.log("e.target.value : ", e.target.value);
      setSearchObj({ ...searchObj, name: e.target.value });
      fetchData(pageData);
    }
  };

  const csvreport = {
    data,
    headers: workinHoursHeaders,
    filename: `Working_Hours_Report_(${searchObj.month}_${searchObj.year}).csv`,
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
              title="Working hours"
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
