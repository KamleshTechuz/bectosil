import React from "react";
import "../../../assets/css/login.css";
import { Link } from "react-router-dom";

// modules
import { Formik, Form, Field, ErrorMessage } from "formik";

// hhtp services
// import { getPOsts } from "../../../shared/reqUrl";
// import { getData } from "../../../shared/services/http.service";

// validators
import { userNameValidator } from "../../../shared/services/validator.service";
import { emailValidator } from "../../../shared/services/validator.service";
import { passwordValidator } from "../../../shared/services/validator.service";
import { matchPassword } from "../../../shared/services/validator.service";

const Signup = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    conf_pass: "",
  };
  // let navigate = useNavigate();
  const onSubmit = async (values, { setSubmitting }) => {
    this.setToken("thisIsMyToekn");
    // getData(getPOsts).then((response) => {
    //   navigate(this.CONSTANTS.navigateToLogin);
    // });
  };
  const validator = (values) => {
    const errors = {
      username: userNameValidator(values.username),
      email: emailValidator(values.email),
      password: passwordValidator(values.password),
      conf_pass: matchPassword(values.password, values.conf_pass),
    };
    Object.keys(errors).forEach((key) => {
      if (errors[key] === null) {
        delete errors[key];
      }
    });

    return errors;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <p className="fa fa-key" aria-hidden="true">
              Signup
            </p>
          </div>
          <div className="col-lg-12 login-title">ADMIN PANEL</div>

          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <Formik
                initialValues={initialValues}
                validate={validator}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label className="form-control-label">USERNAME</label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="jhon_wick"
                        className="form-control login-input"
                      />
                      <ErrorMessage
                        name="username"
                        className="text-info"
                        component="div"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">EMAIL</label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="jhon@example.com"
                        className="form-control login-input"
                      />
                      <ErrorMessage
                        name="email"
                        className="text-info"
                        component="div"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-control-label">PASSWORD</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Jhon@123"
                        className="form-control login-input"
                      />
                      <ErrorMessage
                        name="password"
                        className="text-info"
                        component="div"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-control-label">
                        CONFIRM PASSWORD
                      </label>
                      <Field
                        type="password"
                        name="conf_pass"
                        placeholder="Jhon@123"
                        className="form-control login-input"
                      />
                      <ErrorMessage
                        name="conf_pass"
                        className="text-info"
                        component="div"
                      />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="row login-btm login-button">
                        <div className="col-auto">
                          <Link
                            to="/auth/login"
                            className="btn btn-outline-primary col-12"
                          >
                            Login
                          </Link>
                        </div>
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn btn-outline-primary col-12"
                            disabled={isSubmitting}
                          >
                            Signup
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
