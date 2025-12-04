import { LogOut } from "lucide-react";
import Button from "./Button";

function Logout({
  isAuthenticated,
  logout,
}: {
  isAuthenticated: boolean;
  logout: () => void;
}) {
  return (
    <>
      {isAuthenticated && (
        <Button
          className="rounded-full hover:rotate-180 left-2 bottom-2 z-50 fixed"
          size="icon"
          variant="contrast"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export default Logout;
