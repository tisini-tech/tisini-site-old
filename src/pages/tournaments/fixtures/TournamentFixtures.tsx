import { Footer } from "@/components/tournaments/Footer";
import Header from "@/components/tournaments/Header";

export const TournamentFixtures = () => {
  return (
    <main>
      <Header />
      <section className="h-screen bg-blue-500 flex items-center justify-center">
        <div className="text-3xl font-bold">Fixtures to be updated</div>
      </section>
      <Footer />
    </main>
  );
};
