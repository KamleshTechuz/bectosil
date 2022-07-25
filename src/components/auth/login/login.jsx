import "../../../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setToken } from "../../../shared/components/base/base";
import { passwordValidator,emailValidator } from "../../../shared/services/validator.service";
import { CONSTANTS } from "../../../shared/services/constant.service";
import { postData } from "../../../shared/services/http.service";
import { login } from "../../../shared/reqUrl";


import 'react-toastify/dist/ReactToastify.css';
import { showErrorToaster } from "../../../shared/services/error.handle.service";


const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();

  const onSubmit = (values) => {
    postData(login, values)
      .then(({ success, result }) => {
        if (success) {
          setToken("loggedInUser", result);
          navigate(CONSTANTS.navigateToUser);
        }
      })
      .catch(({response : {data}}) => {
        showErrorToaster(data)
      });
  };
  const validator = (values) => {
    const errors = {
      email: emailValidator(values.email),
      password: passwordValidator(values.password),
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
              Login
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
                      <label className="form-control-label">EMAIL</label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control login-input"
                        placeholder="jhon@example.com"
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
                        className="form-control login-input"
                        placeholder="Jhon@123"
                      />
                      <ErrorMessage
                        name="password"
                        className="text-info"
                        component="div"
                      />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="row login-btm login-button">
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn btn-outline-primary col-12"
                            // disabled={isSubmitting}
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-auto">
                          <Link
                            to="/auth/signup"
                            className="btn btn-outline-primary col-12"
                          >
                            Signup
                          </Link>
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

export default Login;
