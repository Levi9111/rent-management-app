const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6 text-center'>
      {/* Welcome Section */}
      <h1 className='text-4xl md:text-5xl font-bold text-blue-800 mb-4'>
        Welcome to Patwari Villa 🏡
      </h1>
      <p className='text-lg md:text-xl text-gray-700 max-w-2xl mb-6'>
        Manage your building’s rent, tenants, and receipts easily and
        efficiently. This platform is built to simplify rent management for
        Patwari Villa.
      </p>

      {/* Divider */}
      <div className='w-full max-w-md border-t-2 border-blue-200 my-6' />

      {/* Owner Info */}
      <div className='bg-white shadow-md rounded-lg p-6 max-w-md w-full text-left'>
        <h2 className='text-xl font-semibold text-blue-700 mb-4'>
          Owner Information
        </h2>
        <p className='mb-2'>
          <span className='font-semibold'>Name:</span> Alaul Hossein Md. Sharif
        </p>
        <p className='mb-2'>
          <span className='font-semibold'>Address:</span> 187/5/B/1, Matikata,
          Dewan Para
        </p>
        <p>
          <span className='font-semibold'>Phone:</span> 01976-084208
        </p>
      </div>

      {/* Footer / Message */}
      <p className='text-sm text-gray-500 mt-10'>
        Patwari Villa Rent Management © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Home;
