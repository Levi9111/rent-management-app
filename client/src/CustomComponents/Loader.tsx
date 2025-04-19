'use client';
const Loader = () => {
  return (
    <div
      className='min-h-screen flex items-center justify-center '
      aria-busy='true'
      aria-live='polite'
    >
      <div className='text-center max-w-xs sm:max-w-sm'>
        {/* Header */}
        <h1 className='text-3xl md:text-5xl font-extrabold text-blue-700 mb-6 opacity-0 animate-fadeIn'>
          Patwari Villa
        </h1>

        {/* Loading dots */}
        <div className='flex justify-center items-center space-x-2 text-gray-600 text-lg md:text-xl font-semibold'>
          <span>Loading</span>
          <span className='dot animate-bounce delay-150'>.</span>
          <span className='dot animate-bounce delay-300'>.</span>
          <span className='dot animate-bounce delay-450'>.</span>
        </div>

        {/* Subtext */}
        <p className='mt-8 text-gray-500 text-sm md:text-base'>
          Please wait while we prepare your dashboard...
        </p>
      </div>

      {/* Inline styles for animation delay */}
      <style jsx>{`
        .dot {
          animation-duration: 1.2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-450 {
          animation-delay: 0.45s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-duration: 0.7s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-in;
        }
      `}</style>
    </div>
  );
};

export default Loader;
