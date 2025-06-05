import SignInBtn from "./SignInBtn";
import logo from "../../assets/flavor-forge-logo.svg";
export default function SignIn() {
  const borderCSS = "border border-solid border-amber-700 rounded-md";
  return (
    <>
      <div className="SignIn flex items-center justify-center h-dvh">
        <div className={`wrapper text-center w-full max-w-lg p-6 ${borderCSS}`}>
          <img
            className="w-[15rem] mx-auto"
            src={logo}
            alt="Flavor Forge logo"
          />
          <h2 className="text-xl font-semibold mt-6">
            Welcome to Flavor Forge!
          </h2>
          <p className="text-center mt-4 mb-4">
            Please Sign-In to Forge new recipes or view your existing ones.
            *Please disable adblock for Sign-In to work
          </p>
          <SignInBtn />
        </div>
      </div>
    </>
  );
}
