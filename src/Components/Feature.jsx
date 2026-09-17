export default function Feature() {
  return (
    <section className="bg-[#0a0a10] py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-14">
        <div className="relative shadow-2xl shadow-indigo-500/20 rounded-2xl overflow-hidden shrink-0">
          <img
            className="max-w-md w-full object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=451&h=451&auto=format&fit=crop"
            alt="Professional interview" />
          <div className="flex items-center gap-1 max-w-72 absolute bottom-6 left-6 bg-gray-900/90 backdrop-blur border border-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex -space-x-4 shrink-0">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user"
                className="size-9 rounded-full border-[3px] border-gray-900 hover:-translate-y-1 transition z-1" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user"
                className="size-9 rounded-full border-[3px] border-gray-900 hover:-translate-y-1 transition z-[2]" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="user"
                className="size-9 rounded-full border-[3px] border-gray-900 hover:-translate-y-1 transition z-[3]" />
              <div
                className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-gray-900 bg-indigo-600 hover:-translate-y-1 transition z-[4]">
                5k+
              </div>
            </div>
            <p className="text-sm font-medium text-gray-200">Join top job seekers today</p>
          </div>
        </div>

        <div className="text-sm text-gray-400 max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-white">Your Next Big Move</h1>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-indigo-300 mt-2"></div>
          <p className="mt-8 leading-relaxed">Next Hire is your all-in-one platform for crafting the perfect logic-driven resume, mastering technical interviews, and discovering top-tier job opportunities.</p>
          <p className="mt-4 leading-relaxed">Whether you're a fresh graduate stepping into the tech world or a seasoned professional looking to level up, our intelligent job portal helps you stand out to top recruiters and hiring managers.</p>
          <a href="#" className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white shadow-lg shadow-indigo-500/25">
            <span>Explore Portal</span>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}