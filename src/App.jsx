import { useState, useCallback } from 'react';
import { NavContext, MobileMenuContext } from './NavContext.jsx';
import { Landing } from './Landing.jsx';
import { Login } from './Login.jsx';
import { Dashboard } from './Dashboard.jsx';
import { Upload } from './Upload.jsx';
import { Processing } from './Processing.jsx';
import { Result } from './Result.jsx';
import { Patients } from './Patients.jsx';
import { Report } from './Report.jsx';
import { DesignSystem } from './DesignSystem.jsx';
import { Settings } from './Settings.jsx';

const PAGES = {
  landing:       Landing,
  login:         Login,
  dashboard:     Dashboard,
  patients:      Patients,
  upload:        Upload,
  queue:         Processing,
  results:       Result,
  reports:       Report,
  designsystem:  DesignSystem,
  settings:      Settings,
};

export function App() {
  const [page, setPage] = useState('landing');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useCallback((id) => {
    setPage(id);
    setMobileOpen(false);
  }, []);

  const mobileMenu = {
    open: mobileOpen,
    toggle: () => setMobileOpen(v => !v),
    close: () => setMobileOpen(false),
  };

  const Page = PAGES[page] ?? Dashboard;

  return (
    <NavContext.Provider value={navigate}>
      <MobileMenuContext.Provider value={mobileMenu}>
        <Page onNavigate={navigate} />
      </MobileMenuContext.Provider>
    </NavContext.Provider>
  );
}
