import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/beranda" element={<Beranda />} />
        <Route path="/asistenpraktikum" element={<AsistenPraktikum />} />
        <Route path="/asistenmahasiswa" element={<AsistenMahasiswa />} />
        <Route path="/kehadiran" element={<Kehadiran />} />
        <Route path="/manajementugas" element={<ManajemenTugas />} />
        <Route path="/penggajian" element={<Penggajian />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/kehadiran/detail" element={<DetailKehadiran />} />
        <Route path="/manajementugas/detail" element={<DetailManajemenTugas />} />
      </Routes>
    </Router>
  );
}

export default App;
