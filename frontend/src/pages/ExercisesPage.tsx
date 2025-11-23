import { fetchExercises } from '../api/FetchExercises';
import { useState, useEffect } from 'react';
import type { CategorizedExercices } from "../types/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/UserContext';
import BackButton from '../components/BackButton';
export default function ExercisesPage() {
    let navigate = useNavigate();
    const [exo, setExercises] = useState<CategorizedExercices[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthInitialized } = useAuth();
    const userId = user?.id?.toString() || null;

    useEffect(() => {
            const loadExercises = async () => {
                if (!isAuthInitialized) {
                    setLoading(false);
                    return;
                }
                if (!userId) {
                    setError("Authentication required. Please log in again.");
                    setLoading(false);
                    return;
                }
                try {
                    setLoading(true);
                    setError(null);
                    const Exercises = await fetchExercises();
                    setExercises(Exercises);
                } catch (err: any) {
                    console.error("Failed to load exercises:", err);
                    setError(err.message || "An unknown error occurred.");
                } finally {
                    setLoading(false);
                }
            };
            if (isAuthInitialized) {
                loadExercises();
            }
        }, [userId]);

    const handleExerciseClick = (exerciseId: number) => {
        navigate(`/exercise/${exerciseId}`);
    };

    return (
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-grey-900 shadow-lg rounded-lg">
               <div className="p-4">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Exercises
                  </span>
                </h1>


                {loading && (
                    <p className="flex items-center text-indigo-500">
                        Loading your exercises…
                    </p>
                )}

                {error && (
                    <p className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        Error: {error}
                    </p>
                )}

                {!loading && !error && exo.length === 0 && (
                    <p className="text-gray-600 p-4 border rounded">
                        There are no exercises.
                    </p>
                )}

                 <div className="space-y-8 mt-6">
                    {exo.map((category) => (
                        <div key={category.name} className="border-l-4 border-indigo-500 pl-4">
                            <h2 className="text-2xl font-bold text-indigo-400 mb-4">
                                {category.name}
                            </h2>
                            <div className="space-y-3">
                                {category.exercises.map((exercise) => (
                                    <button key={exercise.id} onClick={() => handleExerciseClick(exercise.id)}
                                            className="flex-1 flex flex-col items-center justify-center
                                                p-8 rounded-xl shadow-2xl transition hover:shadow-indigo-700/50">
                                            <div>
                                                <p className="text-lg font-semibold truncate">{exercise.title}</p>
                                                <p> {exercise.description}</p>
                                            </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        );

    }
