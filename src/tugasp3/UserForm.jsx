import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function UserForm() {
  const [form, setForm] = useState({
    nama: "",
    ipk: "",
    kontak: "",
    prodi: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Fungsi Validasi Otomatis
  useEffect(() => {
    const validate = () => {
      let err = {};

      // 1. Validasi Nama (3 Aturan)
      if (!form.nama) err.nama = "Nama wajib diisi";
      else if (/[0-9]/.test(form.nama)) err.nama = "Nama tidak boleh mengandung angka";
      else if (form.nama.length < 5) err.nama = "Nama minimal 5 karakter";

      // 2. Validasi IPK (3 Aturan)
      if (!form.ipk) err.ipk = "IPK wajib diisi";
      else if (isNaN(form.ipk)) err.ipk = "IPK harus berupa angka (gunakan titik)";
      else if (parseFloat(form.ipk) < 0 || parseFloat(form.ipk) > 4.0) err.ipk = "Rentang IPK adalah 0.0 - 4.0";

      // 3. Validasi Kontak (3 Aturan)
      if (!form.kontak) err.kontak = "Nomor kontak wajib";
      else if (!/^\d+$/.test(form.kontak)) err.kontak = "Hanya boleh angka";
      else if (form.kontak.length < 10) err.kontak = "Minimal 10 digit nomor";

      // 4. Validasi Prodi
      if (!form.prodi) err.prodi = "Pilih program studi anda";

      // 5. Validasi Semester
      if (!form.semester) err.semester = "Pilih semester aktif anda";

      setErrors(err);
      // Cek apakah form sudah terisi semua DAN tidak ada error
      const allFilled = Object.values(form).every(val => val !== "");
      setIsValid(Object.keys(err).length === 0 && allFilled);
    };

    validate();
  }, [form]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setSubmitted(false); // Sembunyikan hasil jika user mengedit lagi
  };

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        {/* 3 INPUTAN */}
        <InputField 
          label="Nama Lengkap Mahasiswa" 
          type="text" 
          value={form.nama} 
          onChange={(e) => handleChange("nama", e.target.value)} 
          error={errors.nama} 
        />

        <InputField 
          label="Indeks Prestasi Kumulatif (IPK)" 
          type="text" 
          value={form.ipk} 
          onChange={(e) => handleChange("ipk", e.target.value)} 
          error={errors.ipk} 
        />

        <InputField 
          label="Nomor WhatsApp" 
          type="text" 
          value={form.kontak} 
          onChange={(e) => handleChange("kontak", e.target.value)} 
          error={errors.kontak} 
        />

        {/* 2 SELECT DROPDOWN */}
        <SelectField 
          label="Program Studi" 
          value={form.prodi} 
          onChange={(e) => handleChange("prodi", e.target.value)} 
          options={["Teknik Informatika", "Sistem Informasi", "Desain Komunikasi Visual"]} 
          error={errors.prodi} 
        />

        <SelectField 
          label="Semester Saat Ini" 
          value={form.semester} 
          onChange={(e) => handleChange("semester", e.target.value)} 
          options={["Semester 1", "Semester 3", "Semester 5", "Semester 7"]} 
          error={errors.semester} 
        />

        {/* CONDITIONAL RENDERING: Tombol hanya muncul jika validasi lolos */}
        {isValid && (
          <button
            type="submit"
            className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg animate-bounce-short"
          >
            KIRIM PENGAJUAN BEASISWA
          </button>
        )}
      </form>

      {/* HASIL RESPON (Hanya muncul jika sudah disubmit) */}
      {submitted && (
        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 animate-fade-in">
          <h3 className="text-blue-800 font-bold text-lg mb-3">Ringkasan Pendaftaran:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>📌 <b>Status:</b> Berkas sedang diproses</li>
            <li>👤 <b>Nama:</b> {form.nama}</li>
            <li>🎓 <b>Prodi:</b> {form.prodi} ({form.semester})</li>
            <li>📈 <b>Target Beasiswa:</b> {parseFloat(form.ipk) >= 3.5 ? "Beasiswa Prestasi" : "Beasiswa Umum"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}