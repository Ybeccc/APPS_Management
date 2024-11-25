import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';

import Login from './components/Login'; // Import the Login component
import Beranda from './pages/Beranda';
import AsistenPraktikum from './pages/AsistenPraktikum';
import AsistenMahasiswa from './pages/AsistenMahasiswa';
import Kehadiran from './pages/Kehadiran';
import ManajemenTugas from './pages/ManajemenTugas';
import Penggajian from './pages/Penggajian';
import Lowongan from "./pages/Lowongan";
import Profile from './pages/Profile';

import DetailKehadiran from "./pages/DetailKehadiran";
import DetailManajemenTugas from "./pages/DetailManajemenTugas";
import TambahPenggajian from "./pages/TambahPenggajian";
import EditPenggajian from "./pages/EditPenggajian";
import TambahTugas from "./pages/TambahTugas";
import EditTugas from "./pages/EditTugas";
import EditProfile_Asisten from "./components/EditProfile_Asisten";
import ResetPW from "./components/ResetPW";
import AddAppointment from "./components/AddAppointment";
import BuatAkun from "./pages/BuatAkun";
import ClassCourse from "./components/ClassCourse";
import Appointment from "./components/Appointment";
import Course from "./components/Course";
import Class from "./components/Class";
import AddCourse from "./components/AddCourse";
import AddClass from "./components/AddClass";
import AddClassCourse from "./components/AddClassCourse";
import KehadiranDaftarAsisten from "./components/KehadiranDaftarAsisten";
import TugasDaftarAsisten from "./components/TugasDaftarAsisten";
import EditStatus from "./components/EditStatus";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* MAIN ROUTING MENU */}
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/asistenpraktikum" element={<AsistenPraktikum />} />
        <Route path="/asistenmahasiswa" element={<AsistenMahasiswa />} />
        <Route path="/kehadiran" element={<Kehadiran />} />
        <Route path="/manajementugas" element={<ManajemenTugas />} />
        <Route path="/penggajian" element={<Penggajian />} />
        <Route path="/lowongan" element={<Lowongan />} />
        <Route path="/profile" element={<Profile />} />

        {/* SUB ROUTING MENU */}
        <Route path="/kehadiran/detail/:id" element={<DetailKehadiran />} />
        <Route path="/manajementugas/detail/:id" element={<DetailManajemenTugas />} />
        <Route path="/penggajian/tambah" element={<TambahPenggajian />} />
        <Route path="/penggajian/edit/:id" element={<EditPenggajian />} />
        <Route path="/manajementugas/tambah" element={<TambahTugas />} />
        <Route path="/manajementugas/edit/:id" element={<EditTugas />} />
        <Route path="/profile/edit" element={<EditProfile_Asisten />} />
        <Route path="/resetpassword" element={<ResetPW />} />
        <Route path="/createaccount" element={<BuatAkun />} />
        <Route path="/classcourse" element={<ClassCourse />} />
        <Route path="/classcourse/add" element={<AddClassCourse />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/add" element={<AddAppointment />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/add" element={<AddCourse />} />
        <Route path="/class" element={<Class />} />
        <Route path="/class/add" element={<AddClass />} />
        <Route path="/kehadiran/asisten/:id" element={<KehadiranDaftarAsisten />} />
        <Route path="/tugas/asisten/:id" element={<TugasDaftarAsisten />} />
        <Route path="/edituserstatus/:id" element={<EditStatus />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
