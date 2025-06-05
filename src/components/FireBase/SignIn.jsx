import SignInBtn from "./SignInBtn";
import logo from "../../assets/flavor-forge-logo.svg";
export default function SignIn() {
  const borderCSS = "border border-solid border-amber-900 rounded-md";
  return (
    <>
      <div className="SignIn flex items-center justify-center h-dvh">
        <div
          className={`wrapper text-center w-full max-w-lg p-6 bg-amber-900 ${borderCSS}`}
        >
          <img
            className="w-[15rem] mx-auto my-6"
            src={logo}
            alt="Flavor Forge logo"
          />
          <div className={`sign-in-pane p-6`}>
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
