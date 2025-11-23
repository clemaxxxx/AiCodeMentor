import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SelectRolePage from  "./pages/SelectRolePage";
import DashBoardTeacher from "./pages/DashBoardTeacher";
import TeacherPage from "./pages/TeacherPage";
import YourExercisesPage from "./pages/YourExercisesPage";
import ExercisesPage from "./pages/ExercisesPage";
import DashBoardStudent from "./pages/DashBoardStudent";
import { AuthProvider } from './pages/UserContext';
import  ExerciseDetailPage from './pages/ExerciseDetailPage';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/select_role" element={<SelectRolePage/>} />
                    <Route path="/login/:role" element={<LoginPage/>} />
                    <Route path= "/teacher/dashboard" element={<DashBoardTeacher/>} />
                    <Route path= "/student/dashboard" element={<DashBoardStudent/>} />
                    <Route path="teacher/CreateExercise" element={<TeacherPage/>} />
                    <Route path="teacher/exercises" element={<YourExercisesPage/>} />
                    <Route path="/exercises" element={<ExercisesPage/>} />
                    <Route path="/exercise/:id" element={<ExerciseDetailPage/>} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );


};


