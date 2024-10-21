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
import Profile from './pages/Profile';

import DetailKehadiran from "./pages/DetailKehadiran";
import DetailManajemenTugas from "./pages/DetailManajemenTugas";
import TambahPenggajian from "./pages/TambahPenggajian";
import EditPenggajian from "./pages/EditPenggajian";
import TambahTugas from "./pages/TambahTugas";
import EditTugas from "./pages/EditTugas";

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
        <Route path="/profile" element={<Profile />} />

        {/* SUB ROUTING MENU */}
        <Route path="/kehadiran/detail/:id" element={<DetailKehadiran />} />
        <Route path="/manajementugas/detail/:id" element={<DetailManajemenTugas />} />
        <Route path="/penggajian/tambah" element={<TambahPenggajian />} />
        <Route path="/penggajian/edit" element={<EditPenggajian />} />
        <Route path="/manajementugas/tambah" element={<TambahTugas />} />
        <Route path="/manajementugas/edit" element={<EditTugas />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
