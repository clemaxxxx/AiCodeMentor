import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { fetchExercise } from "../api/FetchExercise";
import type {ExerciseSummary, ExecutionResponse} from "../types/api.ts";
import {SubmitStudentSolution} from "../api/SubmitStudentSolution"
import BackButton from '../components/BackButton';
export default function ExerciseDetailPage() {
  const {id} = useParams();
  const [exercise, setExercise] = useState<ExerciseSummary | null>(null);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<ExecutionResponse | null>(null);
  const [showHints, setShowHints] = useState<boolean>(false);
  //const [hints, setHints] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  if (!id) {
    console.error("No ID provided!");
    return;
  }
  // Recup Exo
  useEffect(() => {
      const loadExercise = async () => {
        try {
          setLoading(true);
          const data = await fetchExercise(id);
          setExercise(data);
          setCode(data.statement);
        } catch (err: any) {
          setError("Unable to load the exercise.");
        } finally {
          setLoading(false);
        }
      };
      if (id) loadExercise();
  }, [id]);
  // Envoyer solution
  const handleSubmit = async () => {
      if (!exercise) return;
      try {
        setLoading(true);
        setResult(null);
        const response = await SubmitStudentSolution(exercise.id.toString(), code);
        //setResult(response.allPased);
        //setHints(response.results || []);
        setResult(response);
      } catch (err: any) {
        setError("Error while submitting your solution.");
      } finally {
        setLoading(false);
      }
    };
     if (loading) return <p className="text-indigo-400">Loading...</p>;
     if (error) return <p className="text-red-500">{error}</p>;
     if (!exercise) return <p>Exercise not found.</p>;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <div className="w-full max-w-4xl p-6 rounded-lg shadow-xl shadow-lg shadow-red-500/50 transition">
                <div className="p-4">
                    <BackButton />
                </div>
               <div className="flex justify-end">
                   <button onClick={() => setShowHints(!showHints)} className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-red-800/50 transition">
                       {showHints ? "Hide hints" : "Show hints"}
                   </button>
               </div>
                <h1 className="text-3xl font-bold mb-4 text-indigo-600">{exercise.title}</h1>
                <p className="text-gray-700 mb-4">{exercise.description}</p>
                {showHints && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-3 text-indigo-400">Exercise hints</h2>
                        <ul className="space-y-3">
                            {exercise.tests.map((testSummary, index) => (
                                <li key={testSummary.id}
                                    className="p-3 bg-gray-700 rounded-md border border-gray-600">
                                    <p className="text-sm italic text-amber-300">
                                        Hint #{index + 1} : {testSummary.hint}
                                    </p>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
                    <Editor height="400px" language="java"
                            theme="vs-dark" value={code}
                            onChange={(value) => setCode(value || "")}/>
                </div>
                <button onClick={handleSubmit} className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/50 transition">
                        Submit
                </button>
                {result && (
                    <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                        <h2 className="text-white font-bold mb-2 text-xl">Résultat :</h2>
                        <p className={`font-semibold text-lg ${result.allPased ? 'text-green-400' : 'text-red-400'}`}>
                            Overall status : {result.allPased ? "All tests passed" : "Failed on some tests"}
                        </p>

                        <div className="mt-4 space-y-2">
                             <h3 className="font-semibold text-indigo-300">Détails des tests:</h3>
                             {result.results.map((testResult, index) => (
                                 <div key={testResult.test.id} className="p-3 bg-gray-700 rounded-md">
                                     <span className="font-medium">Test #{index + 1}: </span>
                                     <span className={`font-bold ${testResult.passed ? 'text-green-400' : 'text-red-400'}`}>
                                         {testResult.passed ? "Passed" : "Failed"}
                                     </span>
                                     {!testResult.passed && (
                                         <p className="text-sm text-gray-400 mt-1">
                                             Hint for failure : {testResult.test.hint}
                                         </p>
                                     )}
                                 </div>
                             ))}
                        </div>
                    </div>
                 )}

        </div>
    </div>
      );
  }
