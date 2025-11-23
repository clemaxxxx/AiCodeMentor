import { useNavigate } from 'react-router-dom';

export default function SelectRolePage() {
    let navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">

            <h1 className="text-4xl font-extrabold mb-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Select your Role
                </span>
            </h1>

            <div className="flex w-full max-w-4xl space-x-5 h-80">
                <button
                    onClick={() => navigate('/login/teacher')}
                    className="flex-1 flex flex-col items-center justify-center
                                p-8 rounded-xl shadow-2xl transition hover:shadow-red-500/50">
                    <span className="text-4xl text-white font-extrabold mb-2">Teacher</span>

                    <span className="text-lg text-teal-500 text-center mt-2">
                      To generate exercises and publish them for students
                    </span>
                </button>

                <button
                    onClick={() => navigate('/login/student')}
                    className="flex-1 flex flex-col items-center justify-center
                                p-6 rounded-xl shadow-2xl transition hover:shadow-green-500/50  ">
                    <span className="text-4xl text-white font-extrabold mb-2"> Student </span>
                    <span className="text-lg text-teal-500 text-center mt-2">
                        Practice with different types of exercises
                    </span>
                </button>

            </div>
        </div>


    );
}

// Flex pour activer mode Flexbox sur conteneur ; flex-1 c'est le fils de flex; flex-col on empile les fils verticalement