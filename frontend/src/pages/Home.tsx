import { useEffect, useState } from "react";
import { fetchPatients } from "../services/patientService";
import { Patient } from "../types/Patient";
import PatientCard from "../components/PatientCard";
import AddPatientModal from "../components/AddPatientModal";
import Navbar from "../components/Navbar";

function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPatients = () => {
    setLoading(true);
    fetchPatients()
      .then(setPatients)
      .catch(() => alert("Error loading patients"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-12 py-8 relative">
        <h2 className="text-3xl font-bold mb-8">Registered Patients</h2>

        {loading && <p className="text-slate-500">Loading...</p>}
        {!loading && patients.length === 0 && (
          <p className="text-slate-500">No patients found.</p>
        )}
        {!loading && patients.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patients.map((p) => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-7 right-7 h-20 w-20 bg-blue-600 text-white text-5xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
        >
          +
        </button>

        {isModalOpen && (
          <AddPatientModal
            onClose={() => setIsModalOpen(false)}
            onPatientAdded={loadPatients}
          />
        )}
      </div>
    </>
  );
}

export default Home;
