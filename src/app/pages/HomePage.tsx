import { PageShell } from "../components/PageShell";
import "./HomePage.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning.";
  if (hour < 17) return "Good afternoon.";
  return "Good evening.";
}

export function HomePage() {
  return (
    <PageShell title={getGreeting()} titleStyle={{ fontSize: "3rem" }} heroHeight={205}>
      <div className="home-content">
        <div className="slim-banner">
          <div className="slim-banner__bar" />
          <div className="slim-banner__body">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="slim-banner__icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1B1B1B" />
            </svg>
            <p className="slim-banner__text"><strong>Did you know</strong> - The Illinois Regulatory Licensing and Permitting is an easy-to-use, statewide licensing and permitting system across all subscribing government organizations within Illinois. Find out more by visiting Regulatory Licensing and Permitting.</p>
          </div>
        </div>

        <div className="home-tiles">
          <div className="home-tile">
            <div className="home-tile__title-row">
              
              <h2 className="home-tile__heading">Business</h2>
            </div>
            <div className="home-tile__items">
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Account</span>
                  <span className="home-tile__desc">Add, edit, and update information about yourself</span>
                </span>
              </a>
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Submissions</span>
                  <span className="home-tile__desc">View the content and status of all your submissions</span>
                </span>
              </a>
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Certifications</span>
                  <span className="home-tile__desc">Manage your existing certificates, licenses, and permits</span>
                </span>
              </a>
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Shopping Cart</span>
                  <span className="home-tile__desc">Purchase items you previously added to your cart</span>
                </span>
              </a>
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">State Portal</span>
                  <span className="home-tile__desc">Search for more applications</span>
                </span>
              </a>
            </div>
          </div>

          <div className="home-tile">
            <div className="home-tile__title-row">
              
              <h2 className="home-tile__heading">Asset License</h2>
            </div>
            <div className="home-tile__items">
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Asset Submissions</span>
                  <span className="home-tile__desc">View the content and status of all your asset submissions</span>
                </span>
              </a>
              <a href="#" className="home-tile__item">
                <span className="home-tile__item-inner">
                  <span className="home-tile__label">Asset Certifications</span>
                  <span className="home-tile__desc">Manage your existing asset certifications</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
