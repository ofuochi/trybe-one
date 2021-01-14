import { Menu } from "../components/Common/Menu";
import { PageHeader } from "../components/Common/PageHeader";

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      <Menu />
      <div className="main-wrapper mdc-drawer-app-content">
        <div className="page-wrapper mdc-toolbar-fixed-adjust">
          <main className="content-wrapper">
            <PageHeader />

            <div className="row">{children}</div>
            <div className="mdc-layout-grid"></div>
          </main>
        </div>
      </div>
    </>
  );
};
