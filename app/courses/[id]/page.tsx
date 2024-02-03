"use client";

import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client";
import { Course, Assignment } from "@/supabase/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseDetails, CourseData } from "@/components/course-details";
import courseData from "@/utils/mockdata.json";

const data: CourseData = courseData[0];

export default function CoursePage({ params }: { params: { id: string } }) {

  const supabase = createClient();
  const router = useRouter();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [tab, setTab] = useState(null);

  const getCourse = async () => {
    if (params.id) {
      const result = await supabase
        .from("courses")
        .select("*")
        .eq("id", params.id).single();
      setCourse(result.data);
    }
  };

  const getAssignments = async () => {
    if (params.id) {
      const result = await supabase
        .from("assignments")
        .select("*")
        .eq("course_id", params.id);
      if(result.data != null)
        setAssignments(result.data || []);
    }
  };

  useEffect(() => {
    getCourse();
    getAssignments();
  }, []);

  return (
    <>
      <div className="w-[340px] flex flex-col justify-start h-full ml-[15px] w-300 overflow-hidden">

        <div className="w-full h-[260px] mb-[15px] rounded-xl flex flex-col justify-end bg-primary-900 p-[25px]">
            <h1 className="text-2xl font-black text-white mb-2">{course != null ? course.title : "Unknown Course"}</h1>
            <p className="text-white">{ course != null ? course.number : "Unknown Section" }</p>
        </div>

        <div className="w-full flex-1 rounded-xl bg-primary-900 p-[25px]">
            <p className="text-secondary-500 font-bold">Due Soon</p>
            <div className="my-[25px]">
                <h3 className="text-white font-bold">{ assignments[0] != null ? assignments[0].name : "" }</h3>
                <p className="text-gray-200">Due today 11:59pm &bull; { assignments[0] != null ? assignments[0].value : "" } points</p>
            </div>
            <Button className="bg-secondary-500 text-white">Open</Button>
            <hr className="my-[25px]"></hr>
            <div className="w-full rounded-xl p-3 mb-[15px] text-white font-bold bg-gray-500">
              Home
            </div>
            <div className="w-full rounded-xl p-3 mb-[15px] text-white font-bold">
              Announcements
            </div>
            <div className="w-full rounded-xl p-3 mb-[15px] text-white font-bold">
              Modules
            </div>
            <div className="w-full rounded-xl p-3 mb-[15px] text-white font-bold">
              Assignments
            </div>
        </div>

      </div>

      <div className="h-full flex-1 bg-primary-900 p-[25px] ml-[15px] rounded-xl overflow-y-scroll">
        <div className="pb-6">
          <h1 className="text-4xl font-black text-white mb-2">{course != null ? course.title : "Unknown Course"}</h1>
          <p className="text-xl text-white">{ course != null ? course.number : "Unknown Section" }</p>
        </div>
        <CourseDetails {...data} />
      </div>
    </>
  );
}
