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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBullhorn, faBook, faMessage, faM } from "@fortawesome/free-solid-svg-icons";

export default function CoursePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [tab, setTab] = useState("home");

  const getCourse = async () => {
    if (params.id) {
      const result = await supabase
        .from("courses")
        .select("*")
        .single();
      setCourse(result.data);
    }
  };

  const getAssignments = async () => {
    if (params.id) {
      const result = await supabase
        .from("assignments")
        .select("*")
        .eq("course_id", params.id);
      if (result.data != null)
        setAssignments(
          result.data.sort(
            (a, b) =>
              moment(a.due_at).utc().valueOf() -
              moment(b.due_at).utc().valueOf()
          ) || []
        );
    }
  };

  useEffect(() => {
    getCourse();
    getAssignments();
  }, []);

  return (
    <>
      <div className="w-[340px] flex flex-col justify-start h-full ml-[15px] w-300 overflow-hidden">
        <div
          className="w-full h-[260px] mb-[15px] rounded-xl flex flex-col justify-end bg-primary-900 p-[25px]"
          style={{
            backgroundImage: `url(${course != null ? course.bg_image : null})`,
          }}
        >
          <div className="backdrop-blur-sm w-fit p-3 rounded-xl">
            <h1 className="text-2xl font-black text-white mb-2">
              {course != null ? course.title : "..."}
            </h1>
            <p className="text-white">
              {course != null ? course.number : "..."}
            </p>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-scroll no-scrollbar rounded-xl bg-primary-900 p-[25px]">
          <p className="text-secondary-500 font-bold">Due Soon</p>
          <div className="my-[25px]">
            <h3 className="text-white font-bold">
              {assignments[0] != null ? assignments[0].name : ""}
            </h3>
            <p className="text-gray-200">
              Due{" "}
              {assignments[0] != null
                ? moment(assignments[0].due_at).format("dddd")
                : ""}{" "}
              at{" "}
              {assignments[0] != null
                ? moment(assignments[0].due_at).format("hh:mm A")
                : "11:59am"}{" "}
              &bull; {assignments[0] != null ? assignments[0].value : "100"}{" "}
              points
            </p>
          </div>

          <Button
            onClick={() => {
              router.push(
                `/courses/${params.id}/assignment/${assignments[0].id || "1"}`
              );
            }}
            className="bg-secondary-500 text-white"
          >
            Open
          </Button>

          <hr className="my-[25px]"></hr>
          <div
            className={`w-full rounded-xl p-3 mb-[15px] text-white ${
              tab == "home" ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              setTab("home");
            }}
          >
            <FontAwesomeIcon icon={faHouse} className="mr-2"></FontAwesomeIcon>{" "}
            Home
          </div>
          <div
            className={`w-full rounded-xl p-3 mb-[15px] text-white ${
              tab == "announcements" ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              setTab("announcements");
            }}
          >
          </div>
    
        </div>
      </div>

      <div className="h-full flex-1 bg-primary-900 p-[25px] ml-[15px] rounded-xl overflow-y-scroll">
        <div className="pb-6">
          <h1 className="text-4xl font-black text-white mb-2">
            {course != null ? course.title : "Unknown Course"}
          </h1>
          <p className="text-xl text-white">
            {course != null ? course.number : "Unknown Section"}
          </p>
        </div>
        <CourseDetails {...data} />
        <div className="flex-1 overflow-y-scroll no-scrollbar bg-primary-900 p-[25px] ml-[15px] rounded-xl">
          {tab == "home" ? (
            <div>
              <h1 className="text-white font-bold text-4xl">Home</h1>
            </div>
          ) : tab == "announcements" ? (
            <div>
              <h1 className="text-white font-bold text-4xl">Announcements</h1>
            </div>
          ) : tab == "assignments" ? (
            <div>
              <h1 className="text-white font-bold text-4xl mb-5">
                Assignments
              </h1>
              {assignments.map((assignment) => {
                return (
                  <div className="w-full p-3 text-white bg-primary-400 rounded-xl mb-5">
                    <h3 className="font-bold text-lg">{assignment.name}</h3>
                    <p className="text-gray-200">
                      Due {moment(assignment.due_at).format("dddd")} at{" "}
                      {moment(assignment.due_at).format("hh:mm A")} &bull;{" "}
                      {assignment.value} points
                    </p>
                  </div>
                );
              })}
            </div>
          ) : tab == "discussions" ? (
            <div>
              <h1 className="text-white font-bold text-4xl">Discussions</h1>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
