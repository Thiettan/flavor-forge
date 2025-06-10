import SignInBtn from "./SignInBtn";
import logo from "../../assets/flavor-forge-logo.svg";
import video from "../../assets/embers-stock.mp4";
export default function SignIn() {
  const borderCSS = "border border-solid border-slate-900 rounded-xl";
  return (
    <>
      <div className="SignIn p-4 relative flex items-center justify-center h-screen overflow-hidden">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        {/* Optional overlay for contrast */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 -z-5"></div>

        <div
          className={`wrapper p-6 relative z-10 text-center w-full max-w-lg bg-slate-900/90 ${borderCSS}`}
        >
          <img
            className="w-[15rem] mx-auto my-6"
            src={logo}
            alt="Flavor Forge logo"
          />
          <div className={`sign-in-pane`}>
            <h2 className="text-3xl font-semibold mt-3">
              Welcome to Flavor Forge!
            </h2>
            <p className="text-center mt-4 mb-4">
              Sign-In to Forge new recipes or view your existing ones.
              <br />
              <span className="text-xs">
                *Please disable adblock for Sign-In to work
              </span>
            </p>
            <SignInBtn />
          </div>
        </div>
      </div>
    </>
  );
}
