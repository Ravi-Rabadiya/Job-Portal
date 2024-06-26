import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app-auth-footer">
      <div className="container text-center py-3">
        <small className="copyright">
          Designed with <span className="sr-only">love</span>
          <i className="fas fa-heart" style={{ color: "#fb866a" }}></i> by{" "}
          <Link className="app-link" to="#0" target="_blank">
            Xiaoying Riley
          </Link>{" "}
          for developers
        </small>
      </div>
    </footer>
  );
};

export default Footer;
