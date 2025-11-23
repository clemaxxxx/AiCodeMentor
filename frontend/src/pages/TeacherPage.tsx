import { useState, type FormEvent, useRef, useEffect } from 'react';
import type { DescriptionInput, ExerciseSummary,ExerciseResponse,RefineInput,AiGeneratedExercise } from '../types/api';
import { generateExercise,AppendExercise,refineExercise } from '../api/ExerciseService';
import { useAuth } from '../pages/UserContext';
import BackButton from '../components/BackButton';
import {LoadingDots } from '../components/LoadingDots';
//TYPES  POUR L'HISTORIQUE
interface DiscussionEntry {
    id: number;
    sender: 'user' | 'server';
    text: string;
    fullOutput?: AiGeneratedExercise;
    timestamp: Date;
}

export default function TeacherExerciseCreationPage() {
    const [currentInput, setCurrentInput] = useState<string>('');
    const [discussionHistory, setDiscussionHistory] = useState<DiscussionEntry[]>([]);
    const [lastServerOutput, setLastServerOutput] = useState<AiGeneratedExercise | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    //Pour faire defiler les messages
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // Déclenche le défilement après chaque mise à jour de l'historique
    useEffect(scrollToBottom, [discussionHistory]);
    const { user, token} = useAuth();
    const name = user?.name || null;

    const handleIterationSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedInput = currentInput.trim();
        if (!trimmedInput) return;
        if (!name || !token) {
            setError("Session expired. Please log in again.");
            return;
        }
        setLoading(true);
        setError(null);
        const newUserEntry: DiscussionEntry = {
            id: Date.now(),
            sender: 'user',
            text: trimmedInput,
            timestamp: new Date(),
        };
        setDiscussionHistory(prev => [...prev, newUserEntry]);
        setCurrentInput('');
       try {
           let apiResponse: ExerciseResponse;
           if (sessionId === null) {
               const payload: DescriptionInput = { description: trimmedInput, teachername: name };
               apiResponse = await generateExercise(payload);
           } else {
               const payload: RefineInput = {
                   sessionId: sessionId,
                   instruction: trimmedInput,
                   teachername: name
               };
               apiResponse = await refineExercise(payload);
           }
           setSessionId(apiResponse.sessionId);
           const exerciseData = apiResponse.exercise;
           const serverResponseEntry: DiscussionEntry = {
               id: Date.now() + 1,
               sender: 'server',
               text: exerciseData.description,
               fullOutput: exerciseData,
               timestamp: new Date(),
           };
           setDiscussionHistory(prev => [...prev, serverResponseEntry]);
           setLastServerOutput(exerciseData);
           } catch (err: any) {
               console.error('Error communicating with the API:', err);
               setError(`Error please detail more your description`);
           } finally {
               setLoading(false);
           }
    };

    // Bouton Publier
    const handlePublish = async () => {
        if (!lastServerOutput) {
            alert("Please complete an exercise before publishing.");
            return;
        }
        try {
            const payload: ExerciseSummary = {
                    id : 0,
                    title: lastServerOutput.title,
                    description: lastServerOutput.description,
                    statement: lastServerOutput.statement,
                    difficulty: lastServerOutput.difficulty,
                    teachername: name,
                    concept: lastServerOutput.concept ? {
                        id: 0,
                        theme: lastServerOutput.concept.theme
                    } : null,

                    exemple: lastServerOutput.exemple ? {
                        id: 0,
                        code: lastServerOutput.exemple.code,
                        explication: lastServerOutput.exemple.explication
                    } : null,

                    tests: lastServerOutput.tests.map(aiTest => ({
                        id: 0,
                        test: aiTest.test,
                        input: aiTest.input,
                        output: aiTest.output,
                        hint: aiTest.hint
                    }))
            };
            const savedExercise = await AppendExercise(payload);
            alert(`Exercise ${savedExercise.title} successfully published by ${name}!`);
            setDiscussionHistory([]);
            setLastServerOutput(null);
            setCurrentInput('');
            setSessionId(null);
            setError(null);
            } catch (err: any) {
               console.error('Error while communicating with the API:', err);
               setError(`API call failed. Message: ${err.message}`);
            }
    };



    return (
        <div className="flex flex-col h-screen bg-gray-900 p-6">
            <div className="p-4">
                <BackButton />
            </div>

            <header className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                        Exercise Creation
                    </span>
                </h1>

                <button
                    onClick={handlePublish}
                    disabled={!lastServerOutput}
                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/50 transition">
                    Publish
                </button>

            </header>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-400">
                    Error: {error}
                </div>
            )}


            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-indigo-600 rounded-lg shadow-lg mb-4">

                {discussionHistory.length === 0 ? (
                    <p className="text-gray-800 italic text-center p-10">
                        Discussion
                    </p>
                ) : (
                    discussionHistory.map((entry) => (
                        <div key={entry.id} className={`flex ${entry.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                            {entry.sender === 'user' ? (
                                <div className="bg-indigo-900 text-white p-3 rounded-xl rounded-br-none max-w-2/3 shadow whitespace-pre-wrap">
                                    {entry.text}
                                </div>
                            ) : (

                                <div className="bg-blue-900 p-4 rounded-xl rounded-tl-none max-w-2/3 shadow-md">
                                    <h3 className="font-semibold text-red">Your Exercise:</h3>
                                    {entry.fullOutput &&(
                                        <div className="mt-2 text-xs text-white italic border-t border-gray-300 pt-1 space-y-1">
                                            <p> Titre: <strong>{entry.fullOutput.title}</strong></p>
                                            <p> Description: {entry.fullOutput.description} </p>
                                            <p> Statement: {entry.fullOutput.statement} </p>
                                            <p> Difficulty: {entry.fullOutput.difficulty}</p>
                                            <p> Created by : {user?.name}</p>
                                            <p> Concept : {entry.fullOutput.concept?.theme} </p>
                                            <p> Example : {entry.fullOutput.exemple?.code} </p>
                                            <p> {entry.fullOutput.exemple?.explication} </p>
                                            {entry.fullOutput.tests && entry.fullOutput.tests.length > 0 && (
                                                <ul className="list-disc pl-5 space-y-1">
                                                {entry.fullOutput.tests.map((test, index) => (
                                                    <li key={index}>
                                                        Test Code: <code>{test.test || 'N/A'}</code> | Input: <code>{test.input || 'N/A'}</code> | Output: <code>{test.output}</code>
                                                        Hint : {test.hint}
                                                    </li>

                                                ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
                {loading && (
                    <div className="flex justify-start">
                        <LoadingDots />
                    </div>
                )}
                <div ref={messagesEndRef}/>
            </div>


            <form onSubmit={handleIterationSubmit} className="flex space-x-3">
                <textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Enter the exercise description"
                    rows={2}
                    className="flex-1 p-3 border border-blue-700 rounded-lg resize-none shadow-lg shadow-indigo-500/50 shadow-md"
                    disabled={loading}/>
                <button
                    type="submit"
                    disabled={!currentInput.trim() || loading}
                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/50 transition">
                    {loading ? 'Processing…' : 'Send'}
                </button>
            </form>
        </div>
    );
}