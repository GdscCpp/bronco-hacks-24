"use client";

import { ROUTES } from "@/config/routes";
import { Course } from "@/supabase/helper";
import { createClient } from "@/utils/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AssignmentText() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  const getUser = async () => {
    const { error, data } = await supabase.auth.getUser();
    if (error) {
      router.push(ROUTES.SIGN_IN);
    }

    const user = await supabase
      .from("users")
      .select("*")
      .eq("uuid", data.user?.id!)
      .single();

    return user.data!;
  };

  const [userInput, setUserInput] = useState('');

  return (
    <div className="flex-1 h-full bg-primary-900 p-[25px] ml-[15px] rounded-xl space-y-[25px] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-0 m-0">
        <h1 className="text-center">O</h1>
        <h1 className="text-large">Assignment Title</h1>
        <h1 className="text-center">O</h1>
      </div>

      {/* Progress Bar Header */}
      <div className="flex flex-col space-y-[5px] p-0 m-0">
        {/* Progress Bar */}
        <div className="w-full bg-primary-700 h-[10px] p-0 m-0 rounded-[5px]">
          <div className="bg-secondary-500 h-full rounded-[5px]" style={{ width: '33%' }}></div>
        </div>
        {/* Progress Bar Text */}
        <div className="flex justify-between items-center w-full">
          <p className="text-left text-base">Question 1/3</p>
          <p className="text-right text-gray-500 text-base font-light">Due 11:59</p>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow pt-[10px] space-y-[25px]">
        <p className="text-xl text-medium">whats good</p>
      </div>

      {/* User Input Bar */}
      <div style={{ boxShadow: '0 0 0 1px' }} className="h-[50px] rounded-[10px]">
        {/* Input elements go here */}
      </div>
    </div>
  );
};