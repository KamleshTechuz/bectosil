import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { winnersReport } from "../../../shared/reqUrl";
import { getData } from "../../../shared/services/http.service";
import DataTable from "react-data-table-component";
import {
  months,
  allYears,
  awards,
  winnerReportHeaders,
} from "../../../shared/global-data/Global.data";
import { CSVLink } from "react-csv";
import { showErrorToaster } from "../../../shared/services/error.handle.service";

const columns = [
  {
    name: "Name",
    selector: (row) => row.users.name,
  },
  {
    name: "Month",
    selector: (row) => months[row.month].name,
  },
  {
    name: "Award",
    selector: (row) => (
      <div>
        {row.emerging_winner && (
          <span className="btn-sm btn-warning">
            Emerging employee of the month
          </span>
        )}
        {row.star_winner && (
          <span className="btn-sm btn-success">
            Star Performer of the month
          </span>
        )}
        {row.employee_winner && (
          <span className="btn-sm btn-primary">Employee of the month</span>
        )}
        {row.innovator_leader_winner && (
          <span className="btn-sm btn-secondary">
            Innovator / Leader of the month
          </span>
        )}
      </div>
    ),
  },
];

const initSearchObj = {
  name: "",
  award: "",
  year: new Date().getFullYear(),
};

const initPage = {
  recordPerPage: 10,
  totalRecords: 0,
  currentPage: 0,
};

export const WinnersReport = () => {
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
    if (searchObj.award) reqObj.award = searchObj.award;
    if (searchObj.year) reqObj.year = searchObj.year;

    getData(winnersReport, reqObj)
      .then(({ success, result: { data, totalRecords } }) => {
        if (success) {
          //   data.map((e) => {
          //     e.user_id = this.encrypt(e.user_id);
          //     e.logoClass = this.getClass();
          //     return e;
          //   });
          console.log("winnersReport data : ", data);

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
    setSearchObj((prev) => ({ ...prev, year: e.target.value }));
    fetchData(pageData);
  };

  const handleOnAwardChange = (e) => {
    // setSearchObj({...searchObj, year})
    console.log(e.target.value);
    setSearchObj((prev) => ({ ...prev, award: e.target.value }));
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
    headers: winnerReportHeaders,
    filename: "Ranking_Report.csv",
  };

  return (
    <div className="container-fluid p-5">
      <div className="card">
        <fieldset className="row p-4">
          <label className="col">
            <select
              id="month"
              onChange={handleOnAwardChange}
              name="users-list-select"
              className="form-control login-input"
              value={searchObj?.award}
            >
              {awards.map((award) => {
                return (
                  <option key={award.value} value={award.value}>
                    {award.name}
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
              title="Winner report"
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
