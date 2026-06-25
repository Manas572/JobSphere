import NavbarComp from "./NavbarComp";

export default function Head() {
  return (
    <div className="relative bg-[#060707] w-full h-[80vh]">
      <NavbarComp />

      <div className="flex justify-around items-center pt-20 px-5 flex-wrap relative">
        <div className="bg-cyan-300 h-[362px] w-[362px] absolute rounded-full blur-[120px] -top-[100px] -left-20 opacity-75"></div>

        <div className="max-w-lg relative">
          <h1 className="font-IBMPlexBold text-6xl uppercase flex flex-col gap-3">
            <span className="leading-tight text-white">Hire</span>
            <span className="leading-tight text-cyan-400">Sphere</span>
          </h1>

          <p className="mt-6 font-IBMPlexRegular text-green-100">
            Post jobs, discover qualified candidates, and simplify your hiring
            process with AI-powered recruitment tools.
          </p>
        </div>

        <div className="py-6 sm:py-0">
          <img
            className="rounded-full"
            width="450"
            height="450"
            alt="HireSphere"
            src="https://png.pngtree.com/thumb_back/fh260/background/20221015/pngtree-abstract-programming-workflow-a-screen-displaying-real-python-code-development-photo-image_28458262.jpg"
          />
        </div>
      </div>
    </div>
  );
}