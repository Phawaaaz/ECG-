import { DesignCanvas, DCSection, DCArtboard } from './DesignCanvas.jsx';
import { Landing } from './Landing.jsx';
import { Login } from './Login.jsx';
import { Dashboard } from './Dashboard.jsx';
import { Upload } from './Upload.jsx';
import { Processing } from './Processing.jsx';
import { Result } from './Result.jsx';
import { Patients } from './Patients.jsx';
import { Report } from './Report.jsx';
import { DesignSystem } from './DesignSystem.jsx';

export function App() {
  return (
    <DesignCanvas>
      <DCSection id="marketing" title="Marketing" subtitle="Public-facing landing page">
        <DCArtboard id="landing" label="Landing" width={1280} height={4200}>
          <Landing />
        </DCArtboard>
      </DCSection>

      <DCSection id="onboarding" title="Onboarding" subtitle="Authentication flow">
        <DCArtboard id="login" label="Login" width={1280} height={800}>
          <Login />
        </DCArtboard>
      </DCSection>

      <DCSection id="app" title="Application" subtitle="Core clinical screens">
        <DCArtboard id="dashboard" label="Dashboard" width={1280} height={860}>
          <Dashboard />
        </DCArtboard>
        <DCArtboard id="upload" label="Upload" width={1280} height={860}>
          <Upload />
        </DCArtboard>
        <DCArtboard id="processing" label="Processing" width={1280} height={860}>
          <Processing />
        </DCArtboard>
        <DCArtboard id="result" label="ECG Result" width={1280} height={960}>
          <Result />
        </DCArtboard>
        <DCArtboard id="patients" label="Patients" width={1280} height={860}>
          <Patients />
        </DCArtboard>
        <DCArtboard id="report" label="Report Export" width={1280} height={1080}>
          <Report />
        </DCArtboard>
      </DCSection>

      <DCSection id="design-system" title="Design System" subtitle="Tokens, components, patterns">
        <DCArtboard id="design-system-showcase" label="Design System" width={1300} height={2400}>
          <DesignSystem />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}
