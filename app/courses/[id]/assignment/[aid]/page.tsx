"use client";

import { ROUTES } from "@/config/routes";
import { Assignment, Course } from "@/supabase/helper";
import { createClient } from "@/utils/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssignmentText() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const params = useParams();
  const [assignment, setAssignment] = useState<Assignment>();
  const [activeQuestion, setActiveQuestion] = useState(0);

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

  const getAssignment = async () => {
    const user = await getUser();
    const course = await supabase
      .from("courses")
      .select("*")
      .eq("id", params.id)
      .single();

    const assignments = await supabase
      .from("assignments")
      .select("*")
      .eq("course_id", course.data!.id)
      .eq("id", params.aid)
      .single();

    setAssignment(assignments.data!);
  };

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    getAssignment();
  }, []);

  return (
    <div className="flex-1 h-full bg-primary-900 p-[25px] ml-[15px] rounded-xl space-y-[25px] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-0 m-0">
        <h1 className="text-center">O</h1>
        <h1 className="text-large">{assignment?.name}</h1>
        <h1 className="text-center">O</h1>
      </div>

      {/* Progress Bar Header */}
      <div className="flex flex-col space-y-[5px] p-0 m-0">
        {/* Progress Bar */}
        <div className="w-full bg-primary-700 h-[10px] p-0 m-0 rounded-[5px]">
          <div
            className="bg-secondary-500 h-full rounded-[5px]"
            style={{ width: "33%" }}
          ></div>
        </div>
        {/* Progress Bar Text */}
        <div className="flex justify-between items-center w-full">
          <p className="text-left text-base">Question 1/3</p>
          <p className="text-right text-gray-500 text-base font-light">
            {assignment?.due_at}
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow pt-[10px] space-y-[25px]">
        <p className="font-bold">{assignment?.questions[0].text}</p>
        {assignment?.questions[0].options.map((answer, index) => (
          <div key={index} className="flex items-center">
            <ul>
              <li>{answer}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* User Input Bar */}
      <div
        style={{ boxShadow: "0 0 0 1px" }}
        className="h-[50px] rounded-[10px]"
      >
        {/* Input elements go here */}
        <input className="w-full" />
      </div>
    </div>
  );
}
