import { memo } from "react";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Trang chủ</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/keywords">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Quản lý từ khóa</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/quizz">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Cuộc thi</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
    </ul>
  );
};

export const Sidebar = memo(SidebarComponent);
