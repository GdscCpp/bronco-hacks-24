//@ts-nocheck

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
import { use, useEffect, useState } from "react";
import moment from "moment";
import ChatbotContainer from "@/components/chatbot/chatbot-container";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AssignmentText() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const params = useParams();
  const [assignment, setAssignment] = useState<Assignment>();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState("");

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

  const checkAnswer = () => {
    // Check the user's answer
    if (userInput === assignment?.questions[activeQuestion].correctAnswer) {
      if (activeQuestion + 1 === assignment?.questions.length) {
        // Last question
        return router.push(`${ROUTES.COURSES}/${params.id}/`);
      }
      // Correct
      setActiveQuestion(activeQuestion + 1);
      setError("");
      setUserInput("");
    } else {
      // Incorrect

      setError("Incorrect answer. Please try again.");
    }
  };

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
            style={{
              width: `${
                ((activeQuestion + 1) / assignment?.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        {/* Progress Bar Text */}
        <div className="flex justify-between items-center w-full">
          <p className="text-left text-base">
            Question {activeQuestion + 1} / {assignment?.questions.length}
          </p>
          <p className="text-right text-gray-500 text-base font-light">
            Due: {moment(assignment?.due_at).format("h:mm a")}
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow pt-[10px] space-y-[25px]">
        {assignment?.questions[activeQuestion].type === "trueFalse" && (
          <p>Answer true/false</p>
        )}
        <p className="font-bold">
          {assignment?.questions[activeQuestion].text}
        </p>

        {assignment?.questions[activeQuestion].options &&
          assignment.questions[activeQuestion].options.map((answer, index) => (
            <div key={index} className="flex items-center">
              <ul>
                <li>{answer}</li>
              </ul>
            </div>
          ))}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {assignment && (
        <Dialog>
          <DialogTrigger>Ask a question</DialogTrigger>

          <ChatbotContainer assignment={assignment} />
        </Dialog>
      )}

      {/* User Input Bar */}
      <div
        style={{ boxShadow: "0 0 0 1px" }}
        className="h-[50px] rounded-[10px]"
      >
        {/* Input elements go here */}
        <input
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          className="w-full h-full rounded-xl bg-primary-900 px-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkAnswer();
            }
          }}
        />
      </div>
    </div>
  );
}
