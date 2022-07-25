import { useSearchParams, useNavigate } from "react-router-dom";
import { decrypt } from "../../../shared/components/base/base";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  onlyNumber,
  removeNullError,
} from "../../../shared/services/validator.service";
import { getData, putData } from "../../../shared/services/http.service";
import { ranking, rankingDetails } from "../../../shared/reqUrl";
import { CONSTANTS } from "../../../shared/services/constant.service";
import { showErrorToaster } from "../../../shared/services/error.handle.service";
import { useEffect, useState, useCallback } from "react";
import { awards } from "../../../shared/global-data/Global.data";

export const Award = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const month = parseInt(searchParams.get("month"));
  const year = parseInt(searchParams.get("year"));
  const user_id = parseInt(decrypt(id));

  const navigate = useNavigate();

  const [formdata, setFormData] = useState({});
  const [userName, setusername] = useState("user name");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    const reqObj = { user_id, month, year };

    getData(rankingDetails, reqObj)
      .then(({ result: { data } }) => {
        setusername(data.users.name);
        let award;
        if (data.employee_winner) award = 1;
        else if (data.star_winner === true) award = 2;
        else if (data.emerging_winner === true) award = 3;
        else if (data.innovator_leader_winner === true) award = 4;
        else award = 0;
        setFormData({
          award,
          attitude: data.attitude,
          deliverables: data.deliverables,
        });
        console.log("data : ", data);
      })
      .catch(({ response: { data } }) => {
        showErrorToaster(data);
      });
  }, [month, user_id, year]);

  const onSubmit = (values) => {
    const reqObj = {
      attitude: parseInt(values.attitude),
      deliverables: parseInt(values.deliverables),
      award: parseInt(values.award),
      user_id,
      month,
      year,
    };
    putData(ranking, reqObj)
      .then(({ success }) => {
        if (success) {
          navigate(CONSTANTS.navigateToRanking);
        }
      })
      .catch(({ response: { data } }) => {
        showErrorToaster(data);
      });
  };
  const validator = (values) => {
    const errors = {
      attitude: onlyNumber(values.attitude),
      deliverables: onlyNumber(values.deliverables),
    };
    console.log("errors : ", removeNullError(errors));
    return removeNullError(errors);
  };

  return (
    <div className="container-fluid p-5">
      <div className="card">
        <div className="card-body">
          <div className="m-4">
            <div className="media mb-3">
              <div className="d-flex align-items-center ">
                <div className="avatar">
                  <span
                    className="avatar-content"
                    style={{ height: "50px", width: "50px" }}
                  >
                    {userName.charAt(0).toUpperCase() +
                      userName.split(" ")[1].charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <h3 className="p-2 text-light">{userName}</h3>
            </div>
            <Formik
              initialValues={formdata}
              validate={validator}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <div className="controls text-left">
                          <label
                            htmlFor="users-edit-username"
                            className="form-control-label"
                          >
                            Attitude
                          </label>
                          <Field
                            type="text"
                            name="attitude"
                            className="form-control login-input"
                          />
                          <ErrorMessage
                            name="attitude"
                            className="text-danger"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="controls text-left">
                        <label
                          htmlFor="users-edit-role"
                          className="form-control-label"
                        >
                          Awarding for
                        </label>
                        <Field
                          as="select"
                          name="award"
                          className="form-control login-input"
                          placeholder="Select a City"
                        >
                          {awards.map((award) => {
                            return (
                              <option key={award.value} value={award.value}>
                                {award.name}
                              </option>
                            );
                          })}
                        </Field>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <div className="form-group">
                          <div className="controls text-left">
                            <label
                              htmlFor="users-edit-email"
                              className="form-control-label"
                            >
                              deliverables
                            </label>
                            <Field
                              type="text"
                              name="deliverables"
                              className="form-control login-input"
                            />
                            <ErrorMessage
                              name="deliverables"
                              className="text-danger"
                              component="div"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-4 mt-sm-4">
                      <button
                        type="submit"
                        className="btn btn-primary mb-2 mb-sm-0 mr-sm-2"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
