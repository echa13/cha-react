export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <img src={image} alt="error" className="relative z-10 w-64 md:w-80 transition-transform hover:scale-105" />
        <div className="absolute inset-0 bg-red-100 blur-[100px] opacity-30 rounded-full"></div>
      </div>
      
      <h1 className="text-8xl font-black text-gray-900 leading-none">
        {code}<span className="text-red-500">!</span>
      </h1>
      
      <div className="mt-4 max-w-sm">
        <p className="text-xl font-bold text-gray-800">{description}</p>
        <p className="mt-2 text-gray-400 text-sm">
          Oops! The page you're looking for doesn't exist or an error occurred. 
          Please go back to dashboard.
        </p>
      </div>

      <button className="mt-8 rounded-2xl bg-gray-900 px-8 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all shadow-xl">
        Back to Dashboard
      </button>
    </div>
  );
}