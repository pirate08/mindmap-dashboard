import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 relative overflow-hidden'>
      <div className='absolute inset-0 transform -skew-y-12 bg-gray-800'></div>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-center h-20'>
          <h1 className='text-white text-2xl font-bold'>Pirate's Projects</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
