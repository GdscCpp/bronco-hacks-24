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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function CoursesSidebar() {
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
      .single();

    return user.data!;
  };

  const getCourses = async () => {
    const user = await getUser();

      const courses = await supabase
        .from("courses")
        .select("*")
     
      setCourses(courses.data || []);
    
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-fit flex flex-col h-full bg-primary-900 rounded-xl p-4">
      
      <div className="bg-secondary-500 w-[80px] h-[80px] p-5 rounded-xl text-white mb-[15px] text-2xl flex justify-center items-center" onClick={() => router.push('/courses')}>
        <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
      </div>

      <hr className="mb-[15px]"></hr>

      {courses.map((course) => {
        return (
          <>
            <TooltipProvider key={course.id}>
              <Tooltip>
                <TooltipTrigger
                  className={
                    "bg-primary-400 w-[80px] h-[80px] p-5 rounded-xl text-white mb-[15px]"
                  }
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  {course.number != null ? course.number.substring(0, 4) : "?"}
                </TooltipTrigger>
                <TooltipContent className={"text-white"}>{course.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      })}
    </div>
  );
}
