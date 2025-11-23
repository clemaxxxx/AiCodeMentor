import { useAuth } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';


export default function DashBoardTeacher(){
    const navigate = useNavigate();
    const { user, isAuthInitialized } = useAuth();
    if (!isAuthInitialized) {
            return (
                <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                    <p className="text-indigo-400 text-2xl font-semibold animate-pulse">
                       Loading session…
                    </p>
                </div>
            );
        }
    const username = user?.name;

    return(
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold mb-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Welcome {username}
                </span>
            </h1>

            <div className="flex w-full max-w-4xl space-x-5 h-80">
                <button
                    onClick={() => navigate('/teacher/CreateExercise')}
                    className="flex-1 flex flex-col items-center justify-center
                    p-8 rounded-xl shadow-2xl transition hover:shadow-blue-500/50">
                    <span className="text-4xl text-white font-extrabold mb-2">Generate Exercise</span>

                </button>
                <button
                    onClick={() => navigate('/teacher/exercises')}
                    className="flex-1 flex flex-col items-center justify-center
                    p-8 rounded-xl shadow-2xl transition hover:shadow-red-500/50">
                    <span className="text-4xl text-white font-extrabold mb-2">Your exercises</span>
                </button>
                <button
                    onClick={() => navigate('/exercises')}
                    className="flex-1 flex flex-col items-center justify-center
                    p-8 rounded-xl shadow-2xl transition hover:shadow-indigo-700/50">
                    <span className="text-4xl text-white font-extrabold mb-2">exercises</span>
                </button>
            </div>
        </div>

        );

}