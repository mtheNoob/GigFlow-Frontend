import MainLayout from "../layouts/MainLayout";
import MyApplications from "../components/MyApplications";

function MyApplicationsPage() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">
        My Applications
      </h2>
      <MyApplications />
    </MainLayout>
  );
}

export default MyApplicationsPage;
