 
const listItems = [
    'Home',
    'Cursos',
    'Blog',
    'Developers',
    'Sobre'
]

export const Navbar = () => {
  return (
    <>
      <div className="fixed bg-card/60 flex justify-between items-center gap-16 py-3 px-8 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md text-text shadow-lg z-10 font-semibold">
        <ul className="flex gap-8 text-md">
          {listItems.map((item) => (
            <li className='relative group cursor-pointer' key={item}>{item}
            <span className='absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-gradient-to-r from-card to-muted transition-all duration-300 group-hover:w-full'></span></li>
          ))}
        </ul>

        <button className=" py-1 px-6 rounded-3xl shadow-2xl text-white text-md bg-accent text-center  hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
          Login
        </button>
      </div>
    </>
  );
}
