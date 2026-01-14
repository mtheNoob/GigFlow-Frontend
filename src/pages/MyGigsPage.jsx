import MainLayout from "../layouts/MainLayout";
import MyGigs from "../components/MyGigs";

function MyGigsPage() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">My Gigs</h2>
      <MyGigs />
    </MainLayout>
  );
}

export default MyGigsPage;
