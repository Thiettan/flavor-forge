import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function SignOut() {
  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </>
  );
}
