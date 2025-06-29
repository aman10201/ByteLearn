import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
// import { store } from "@/app/store";

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.")
      navigate("/login")
    }
  }, [isSuccess, data, navigate])
  return (
    <>
      <nav>
        <div className="h-16  dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
          <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
            <div className="flex items-center gap-2">
              <img src="./logo.png" className="h-15" ></img>
              <h1 className="hidden md:block font-extrabold text-2xl">BYTELEARN</h1>
            </div>
            {/* user icon and dark mode icon  */}
            <div className="flex items-center gap-8">
              {
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link to="my-learning">
                            My learning
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="profile">
                            Edit profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logoutHandler}>
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      {user?.role === "instructor" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/login">Signup</Link>
                    </Button>
                  </div>
                )
              }
              <DarkMode />
            </div>
          </div>
          <div className="flex md:hidden items-center justify-between px-4 h-full">
            <div>
              <div className="flex items-center gap-2">
                <img src="./logo.png" className="h-15"></img>
                <h1 className="font-extrabold text-2xl">BYTELEARN</h1>
              </div>
            </div>
            <MobileNavbar />
          </div>
        </div>
      </nav>

    </>
  );
}

export default Navbar;


const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-7">
          <SheetTitle>BYTELEARN</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 " />
        <nav className="flex flex-col space-y-4 pl-6">
          <span>My Learning</span>
          <span>Edit profile</span>
          <p>Log out</p>
        </nav>
        {
          role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }
      </SheetContent>
    </Sheet>
  )
}