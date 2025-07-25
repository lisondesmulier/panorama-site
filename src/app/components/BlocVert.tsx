export default function BlocVert() {
  return (
    <div className="w-full h-32 relative bg-[#01794D] overflow-hidden">
      {/* Trame décorative en fond */}
      <img
  src="/images/Trame4-vertF.png"
  alt="Trame décorative"
  className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75"
/>

      {/* Contenu éventuel centré (facultatif) */}
      {/* <div className="relative z-10 flex justify-center items-center h-full">
        <p className="text-white font-azoMono text-sm">Séparation</p>
      </div> */}
    </div>
  )
}
