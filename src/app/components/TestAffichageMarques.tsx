// ✅ Fonction de test simple pour isoler l'affichage
export default function TestAffichageMarques() {
  const marques = "Boulanger, Saint Maclou, Decathlon, Leroy Merlin, Norauto";

  const brands = marques
    .split(",")
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  return (
    <div className="p-4 text-xl font-azoMono">
      <p>✅ Marques :</p>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>#{brand}</li>
        ))}
      </ul>
    </div>
  );
}
