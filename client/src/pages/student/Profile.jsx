import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React, { Profiler, useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

export default function Profile() {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { data, isLoading, refetch} = useLoadUserQuery();

  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error, isSuccess, isError }] = useUpdateUserMutation();
  const onchangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  }
  console.log(data);
 
  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (data?.user) {
      refetch();
    setName(data.user.name);
  }
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated ")
    }
    if (isError) {
      toast.error(error.message || "Failed to updated")
    }
  }, [error, data, isSuccess, isError])
  if (isLoading) {
    return <ProfileSkeleton />;
  }
  if (!data || !data.user) {
  return <div className="text-center mt-10 text-red-500">User data not found.</div>;
}
 const { user } = data;
  return (
    <>
      <div className=' max-w-4xl mx-auto px-4 my-24 '>
        <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
        <div className='flex flex-col md:flex-row items-center md:items-start my-5 gap-6 '>
          <div className='flex flex-col items-center'>
            <Avatar className='h-24 w-24 md:w-32 md:h-32 mb-4'>
              <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className='mb-2'>
              <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100 '>
                NAME:
                <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.name}</span>
              </h1>
            </div>
            <div className='mb-2'>
              <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100 '>
                EMAIL:
                <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.email}</span>
              </h1>
            </div>
            <div className='mb-2'>
              <h1 className='font-semibold text-lg text-gray-900 dark:text-gray-100 '>
                ROLE:
                <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.role.toUpperCase()}</span>
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm' className="mt-2">
                  Edit profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-centergap-4'>
                    <Label>NAME</Label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="NAME" className="col-span-3" />
                  </div>
                  <div className='grid grid-cols-4 items-centergap-4'>
                    <Label>Profile Photo</Label>
                    <Input onChange={onchangeHandler} type="file" accept="image/*" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                    {
                      updateUserIsLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </>
                      ) : "Save Changes"
                    }
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <h1 className='font-medium text-lg'>
            Courses you're enrolled in
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
            {
              user.enrolledCourses.length === 0 ? <h1>You haven't enrolled yet</h1> : (
                user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
              )
            }

          </div>
        </div>
      </div>
    </>
  )
}

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-24 animate-pulse">
      <div className="flex flex-col md:flex-row items-center md:items-start my-5 gap-6">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 md:w-32 md:h-32 mb-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mt-4" />
        </div>
      </div>
      <div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}