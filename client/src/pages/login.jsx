import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRegisterUserMutation, useLoginUserMutation } from '@/features/api/authApi';
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();


  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "Signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "Signup" ? signupInput : loginInput;
    const action = type === "Signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess  && registerData){
      toast.success(registerData.message || "Signup successful.");
    }
    if(registerError){
      toast.error(registerError.data.message || "Signup Failed");
    }
     if (loginIsSuccess  && loginData){
      toast.success(loginData.message || "Login successful.");
      navigate('/');
    }
    if(loginError){
      toast.error(loginError.data.message || "Login Failed");
    }
  },[loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])

  return (
    <>
      <div className="flex items-center w-full justify-center mt-20">
        <div className="flex w-full max-w-sm flex-col gap-6 border-[3px]">
          <Tabs defaultValue="Signup">
            <TabsList>
              <TabsTrigger value="Signup">Sign Up</TabsTrigger>
              <TabsTrigger value="Login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="Signup">
              <Card>
                <CardHeader>
                  <CardTitle>Signup</CardTitle>
                  <CardDescription>
                    Create a new account and click signup when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text"
                      name="name"
                      value={signupInput.name}
                      onChange={(e) => changeInputHandler(e, "Signup")}
                      placeholder="Eg.Sengar Aman"
                      required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeInputHandler(e, "Signup")}
                      placeholder="example@123gamil.com"
                      required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeInputHandler(e, "Signup")}
                      placeholder="Eg. xyz@123"
                      required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={registerIsLoading} onClick={() => handleRegistration("Signup")}>
                    {
                      registerIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </>
                      ) : "Signup"
                    }
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="Login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Login your password here. After singup, you'll be able to access your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "Login")}
                      placeholder="example@123gamil.com"
                      required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "Login")}
                      placeholder="Eg. xyz@123"
                      required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={loginIsLoading} onClick={() => handleRegistration("Login")}>
                    {
                      loginIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </>
                      ) : "Login"
                    }
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
export default Login;