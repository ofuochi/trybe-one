import CardSection from "../components/Common/CardSection";
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
            <div className="row m-0">
              <div className="col-lg-8 col-md-8 bd-right px-5 mt-4">
                {children}
              </div>
              <div className="col-lg-4 col-md-4">
                <CardSection />
              </div>
            </div>

            <div className="mdc-layout-grid"></div>
          </main>
        </div>
      </div>
    </>
  );
};
