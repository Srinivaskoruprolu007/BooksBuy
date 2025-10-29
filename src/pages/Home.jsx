import { useAuthStore } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4 text-center">
      <h1 className="text-4xl font-bold">
        Welcome{user ? `, ${user.email}!` : ""}
      </h1>
      <p className="text-lg text-gray-600">
        This is your Reading Realm. Grab a book, sip some coffee, and explore!
      </p>
    </div>
  );
};

export default Home;
