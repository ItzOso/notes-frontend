import { Link } from "react-router-dom";
import WorkingIMG from "../images/landingpage-working.svg"

function Landing() {
  return (
      <div>
          <div className="mx-auto w-[960px] lg:w-screen lg:px-5">
              <nav className="flex justify-between items-center h-20">
                  <p className="text-2xl font-semibold">Notes.</p>
                  <Link to="/login">
                      <button className="bg-primary1 px-4 py-2 rounded-lg text-white  hover:bg-primary2">Login</button>
                  </Link>
              </nav>
              <section className="flex h-80 mt-24">
                  <div className="flex flex-col justify-between w-1/2 md:w-full md:text-center md:justify-evenly">
                      <h1 className="text-6xl w-4/6 font-semibold md:w-full">Collect Your Thoughts.</h1>
                      <div className="flex items-center md:justify-center">
                          <Link to="/signup">
                              <button className="bg-primary1 px-5 py-3 rounded-lg text-white text-xl hover:bg-primary2">
                                  Get Started
                              </button>
                          </Link>
                          <p className="text-lg ml-10 w-48">Take notes the simple way for free. Forever.</p>
                      </div>
                  </div>
                  <div className="w-1/2 flex justify-end md:hidden">
                      <img className="h-full" src={WorkingIMG} alt="" />
                  </div>
              </section>
              {/* <div className="bg-black w-[960px] h-[540px] mt-24 m-auto text-white flex justify-center items-center">
                      placeholder for ss of app
                  </div> */}
              <section className="flex justify-center gap-6 my-24 sm:flex-col sm:items-center">
                  <div className="rounded-lg p-5 w-72 bg-gray1">
                      <h2 className="text-xl font-semibold">Use anywhere</h2>
                      <p className="text-lg">
                          Notes are synced up to your account so access your notes conveniently with any device
                          anywhere!
                      </p>
                  </div>
                  <div className="rounded-lg p-5 w-72 bg-gray1">
                      <h2 className="text-xl font-semibold">Easy to use</h2>
                      <p className="text-lg">
                          Just open, create, write, and easily organize. No steep learning curve. Built for you to enjoy
                          an easy experience.
                      </p>
                  </div>
                  <div className="rounded-lg p-5 w-72 bg-gray1">
                      <h2 className="text-xl font-semibold">It&apos;s free</h2>
                      <p className="text-lg">
                          All features are completely free forever so you don&apos;t have to worry about having to pay
                          for anything!
                      </p>
                  </div>
              </section>
              <section className="text-center pb-24">
                  <h2 className="text-5xl mb-12 sm:text-4xl">What are you waiting for?</h2>
                  <Link to="/signup">
                      <button className="bg-primary1 px-5 py-3 rounded-lg text-white text-2xl hover:bg-primary2">
                          Sign up Today
                      </button>
                  </Link>
              </section>
          </div>
      </div>
  );
}

export default Landing