import { fetchTeacherExercises } from '../api/FetchTeacherExercises';
import { useState, useEffect } from 'react';
import type { ExerciseSummary } from "../types/api";
import  { deleteExercise  } from "../api/ExerciseService";
import { useAuth } from '../pages/UserContext';
import BackButton from '../components/BackButton';
export default function YourExercisesPage() {
    const { user} = useAuth();
    const teacherId = user?.id.toString();
    const [exercises, setExercises] = useState<ExerciseSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseSummary | null>(null);
    // useEffect: Pour l'Initialisation et la Synchronisation (Chargement)
    useEffect(() => {
            const loadExercises = async () => {
                if (!teacherId) {
                    setError("Teacher ID missing. Please log in again.");
                    setLoading(false);
                    return;
                }
                try {
                    setLoading(true);
                    setError(null);
                    const latestExercises = await fetchTeacherExercises(teacherId);
                    setExercises(latestExercises);
                } catch (err: any) {
                    console.error("Failed to load exercises:", err);
                    setError(err.message || "An unknown error occurred.");
                } finally {
                    setLoading(false);
                }
            };
            loadExercises();
        }, [teacherId]);


    const handleDeleteConfirmation = async () => {
        if (!selectedExercise || !selectedExercise.id) return;
        try {
            setLoading(true);
            setError(null);
            await deleteExercise(selectedExercise.id);
            setExercises(prev =>
                prev.filter(e => e.id !== selectedExercise.id)
            );

            alert(`Exercise "${selectedExercise.title}" successfully deleted.`);
        } catch (err: any) {
            console.error("Deletion error:", err);
            setError(`Deletion failed: ${err.message}`);
        } finally {
            setSelectedExercise(null);
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        setSelectedExercise(null);
    };

    return (
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-grey-900 shadow-lg rounded-lg">
                <div className="p-4">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    My Exercises
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

                {!loading && !error && exercises.length === 0 && (
                    <p className="text-gray-600 p-4 border rounded">
                        You haven’t created any exercises yet.
                    </p>
                )}

                <div className="space-y-4 shadow-lg shadow-indigo-500/50">
                    {exercises.map((exercise) => (
                        <div key = {exercise.id} onClick={() => setSelectedExercise(exercise)}
                            className="p-4 border border-indigo-200 rounded-lg shadow-md transition duration-150
                                       hover:shadow-lg hover:border-indigo-400">
                            <h2 className="text-xl font-semibold text-indigo-700">{exercise.title}</h2>
                            <p className="text-sm text-gray-500 mt-1"> Difficulty: {exercise.difficulty}</p>
                            <p className="text-sm text-gray-500 mt-1"> Concept: {exercise.concept?.theme}</p>
                            <p className="text-white mt-2 line-clamp-2">Description: {exercise.description}</p>
                            <p className="text-white mt-2 line-clamp-2">Squelette: {exercise.statement}</p>
                            <p className="text-white mt-2 line-clamp-2">Example: {exercise.exemple?.code}</p>
                            <p className="text-white mt-2 line-clamp-2">{exercise.exemple?.explication}</p>
                            {selectedExercise && selectedExercise.id ==exercise.id && (
                                <div className="mt-4 p-3 bg-red-800 border border-red-500 rounded-md">
                                    <p className="text-white font-semibold mb-3">
                                        Do you want to delete the exercise "{exercise.title}" ?
                                    </p>
                                    <div className="flex space-x-3">
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteConfirmation(); }}
                                        className="text-white font-bold py-2 px-4 rounded shadow-2xl transition hover:shadow-red-500/50"
                                        disabled={loading}>
                                            Yes
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleCancelDelete(); }}
                                        className="text-white font-bold py-2 px-4 rounded shadow-2xl transition hover:shadow-green-500/50"
                                        disabled={loading}>
                                            No
                                        </button>
                                    </div>
                                 </div>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        );

    }
