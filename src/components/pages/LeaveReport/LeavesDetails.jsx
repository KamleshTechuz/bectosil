import { CSVLink } from "react-csv";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getData } from "../../../shared/services/http.service";
import { leavesDetail } from "../../../shared/reqUrl";
import { showErrorToaster } from "../../../shared/services/error.handle.service";
import { decrypt } from "../../../shared/components/base/base";
import DataTable from "react-data-table-component";
import {
  leavesReportDetailsheaders,
  months,
  allYears,
} from "../../../shared/global-data/Global.data";

const columns = [
  {
    name: "Month",
    selector: (row) => months[row.month - 1].name,
  },
  {
    name: "Total leaves",
    selector: (row) => row.total_leaves,
  },
];

const initSearchObj = {
  year: new Date().getFullYear(),
};

export const LeavesDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const user_id = parseInt(decrypt(id));

  const [searchObj, setSearchObj] = useState(initSearchObj);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchObj]);

  const fetchData = async () => {
    const reqObj = { user_id };
    if (searchObj.year) reqObj.year = searchObj.year;

    getData(leavesDetail, reqObj)
      .then(({ success, result: { rows } }) => {
        if (success) {
          setData(rows);
          setLoading(false);
        }
      })
      .catch(({ response: { data } }) => {
        showErrorToaster(data);
      });
  };

  const handleOnYearChange = (e) => {
    console.log(e.target.value);
    setSearchObj({ ...searchObj, year: e.target.value });
    fetchData();
  };

  const csvreport = {
    data,
    headers: leavesReportDetailsheaders,
    filename: "Ranking_Report.csv",
  };

  return (
    <div className="container-fluid p-5">
      <div className="card">
        <fieldset className="row d-flex justify-content-center p-3 pt-4">
          <label className="col-2">
            <select
              name="users-list-select"
              className="form-control login-input"
              onChange={handleOnYearChange}
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
          <label htmlFor="ngx-filter-ref" className="col-3 pt-2">
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
              title="Leaves details"
              columns={columns}
              data={data}
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
