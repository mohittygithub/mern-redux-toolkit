import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { reset, register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password didn't match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) navigate("/");

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
        </h1>
        <p>Please create an account.</p>
      </section>

      <section className="form">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password2"
            placeholder="Password2"
            value={password2}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block"
            onClick={registerHandler}
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Register;
