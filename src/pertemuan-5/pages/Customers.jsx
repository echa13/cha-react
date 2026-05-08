import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";

import {
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const customers = [
  {
    name: "Salsabila Adinda",
    email: "salsabila@gmail.com",
    phone: "08123456789",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Andi Saputra",
    email: "andi@gmail.com",
    phone: "08129876543",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Rina Putri",
    email: "rina@gmail.com",
    phone: "081377788899",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

export default function Customers() {
  return (
    <div className="flex bg-[#F3F4F6] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="px-6 py-5">
          <PageHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">

            {customers.map((customer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col items-center text-center">
                  
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                  />

                  <h2 className="mt-4 text-lg font-bold text-gray-800">
                    {customer.name}
                  </h2>

                  <div className="mt-4 space-y-2 text-sm text-gray-500">

                    <div className="flex items-center gap-2 justify-center">
                      <FaEnvelope className="text-green-500" />
                      {customer.email}
                    </div>

                    <div className="flex items-center gap-2 justify-center">
                      <FaPhoneAlt className="text-blue-500" />
                      {customer.phone}
                    </div>

                  </div>

                  <button className="mt-5 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
                    View Profile
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}