import TeamRng from "@/app/components/teamRng";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🚀 Landing page for the site 🚀
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {"Where we get tinder'd into volleyball matches and more"}
        </p>
        <Navbar />
        <p className="text-md text-gray-600">
          World of getting disappointed/happy at the same time with your
          teammates.
        </p>
      </div>
    </main>
  );
}
