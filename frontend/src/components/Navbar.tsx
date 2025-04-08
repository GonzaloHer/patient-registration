function Navbar() {
  return (
    <nav className="bg-white border">
      <div className="container mx-auto flex items-center pt-8">
        <div className="flex items-center">
          <h1 className="text-2xl text-black font-semibold pb-4 me-12">
            PATIENTS
          </h1>
        </div>

        <div className="flex items-center mr-auto ms-3">
          <a
            href="/"
            className="text-slate-500 text-lg border-b-2 pb-5 border-black sm:mx-6"
          >
            Home
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
