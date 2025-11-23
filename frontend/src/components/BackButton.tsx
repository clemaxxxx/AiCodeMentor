import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button onClick={ () => navigate(-1) }
           className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-700 text-white
                      rounded-full shadow-md hover:bg-gray-600 transition duration-150
                      focus:outline-none focus:ring-2 focus:ring-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
        </button>
    );
}