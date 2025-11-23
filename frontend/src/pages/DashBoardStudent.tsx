import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/UserContext';


export default function DashBoardStudent(){
    const navigate = useNavigate();
    const { user,isAuthInitialized } = useAuth();
    const username = user?.name;
     if (!isAuthInitialized) {
         return (
             <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-indigo-400 text-2xl font-semibold animate-pulse">
                   Loading session…
                </p>
             </div>
         );
     }

    return(
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold mb-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Welcome {username}
                </span>
            </h1>
            <div className="flex w-full max-w-4xl space-x-5 h-80">
                <button
                    onClick={() => navigate('/exercises')}
                    className="flex-1 flex flex-col items-center justify-center
                    p-8 rounded-xl shadow-2xl transition hover:shadow-blue-500/50">
                    <span className="text-4xl text-white font-extrabold mb-2">Exercises</span>
                </button>
            </div>
        </div>

        );

}