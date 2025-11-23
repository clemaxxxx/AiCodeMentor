import { useNavigate } from "react-router-dom";


export default function HomePage() {
    let navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
              AICodeMentor
            </span>

          </h1>
          <p className="text-xl md:text-xl text-gray-500 text-center max-w-1xl mb-10 leading-relaxed">
            AICodeMentor helps teachers create programming exercises in seconds. Just describe the task in natural language.
            Students can browse exercises, code in an integrated editor, submit their solutions, get instant feedback, and receive AI-generated hints for failed tests
            AICodeMentor makes learning and teaching programming faster, smarter, and more interactive.
          </p>
          <button onClick={ () => navigate('/select_role')}
            className="
                bg-indigo-600
                text-white
                py-3 px-6
                rounded-lg
                shadow-lg
                shadow-indigo-500/50
                transition
              ">
            Start the adventure
          </button>

        </div>
      );
// py et px espacement vertical/horizontal
// rounded-lg coin arrondis
// span c'est un conteneur en ligne qui permet d'appliquer un styla a un txt
// bg-gradient-to-r Définit le dégradé de gauche à droite (r pour right).
// Rend le fond coloré visible uniquement à travers le texte.
}