import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import type { UserLoginInput, UserLoginOutput } from "../types/api";
import { upsertUser } from '../api/UserService';
import { useAuth } from '../pages/UserContext';
import BackButton from '../components/BackButton';
export default function LoginPage() {
    let navigate = useNavigate();
    const {role} = useParams<{role: string}>();
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            setError("The username cannot be empty.");
            setLoading(false);
            return;
        }

        try {
            const payload: UserLoginInput = { username: trimmedUsername, role: role };
            const data: UserLoginOutput = await upsertUser(payload);
            login(data);
            navigate(`/${data.role}/dashboard`);
        } catch (err: any) {
            console.error(`Upsert error for ${role} :`, err);
            setError(`Login failed. Message: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
           <div className="absolute top-4 left-4 z-10">
                <BackButton />
           </div>
           <div className="max-w-md mx-auto mt-10 p-8 bg-gray-900 shadow-xl rounded-lg border-t-4 border-indigo-600 shadow-lg shadow-indigo-500/50 ">
               <h1 className="text-2xl font-bold text-gray-800 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Connexion {role}
                </span>
               </h1>

               <form onSubmit={handleSubmit} className="space-y-5">
                   <input
                       type="text"
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       className=" w-full p-4 bg-indigo-600
                                  text-white
                                  rounded-lg
                                  shadow-lg
                                  shadow-indigo-500/50
                                  transition
                                   "
                       disabled={loading}/>
                   <button
                       type="submit"
                       className="w-full bg-indigo-600 text-white
                       py-3 rounded-lg font-semibold hover:bg-indigo-700 transition
                         shadow-2xl transition hover:shadow-indigo-500/50"
                       disabled={loading}>
                       {loading ? 'Connecting…' : 'Login'}
                   </button>
               </form>
               {error && (
                   <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                       {error}
                   </div>
               )}
           </div>
        </div>
       );
   }



