import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import MUIButton from "@mui/material/Button";

export default function SignInBtn() {
  function handleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User:", user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  }

  return (
    <>
      <button
        onClick={handleSignIn}
        type="button"
        class="w-full text-white bg-[#c34117] hover:bg-[#c34117]/90 focus:ring-4 focus:outline-none focus:ring-[#c34117]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:focus:ring-[#c34117]/55 me-2 mb-2"
      >
        <svg
          class="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fill-rule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clip-rule="evenodd"
          />
        </svg>
        Sign In with Google
      </button>
    </>
  );
}
