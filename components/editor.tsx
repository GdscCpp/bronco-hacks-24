"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Draggable from "react-draggable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { Json } from "@/supabase/types";
import { Notes } from "@/supabase/helper";
import { Button } from "./ui/button";
import { set } from "react-hook-form";

const extensions = [StarterKit, Underline, Strike, Typography];

export default function NotesEditor() {
  const supabase = createClient();

  const router = useRouter();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [activeNote, setActiveNote] = useState<Notes>();
  const [showEditor, setShowEditor] = useState(true);

  const getUser = async () => {
    const { error, data } = await supabase.auth.getUser();
    if (error) {
      router.push(ROUTES.SIGN_IN);
    }

    const user = await supabase
      .from("users")
      .select("*")
      .eq("uuid", data.user!.id!)
      .single();

    return user.data!;
  };

  const getNotes = async () => {
    const user = await getUser();
    const notes = await supabase
      .from("notes")
      .select("*")
      .eq("owner_id", user.id);

    return setNotes(notes.data || []);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = async () => {
    const { error, data } = await supabase
      .from("notes")
      .update({ content: editor?.getJSON() })
      .eq("id", activeNote!.id);

    if (error) {
      console.error(error);
      return;
    }
  };

  const editor = useEditor({
    extensions: extensions,
    content: (activeNote?.content as JSONContent) || {},
    editorProps: {
      attributes: {
        class:
          "h-5/6 outline-none flex border-none flex-col flex-grow px-6 overflow-auto container bg-white",
      },
    },
    onUpdate({ editor }) {
      if (activeNote) {
        updateNote();
        getNotes();
      }
    },
  });

  if (!editor) return null;

  const boldToggle = () => {
    editor ? editor.chain().focus().toggleBold().run() : null;
  };
  const italicToggle = () => {
    editor ? editor.chain().focus().toggleItalic().run() : null;
  };

  const underlineToggle = () => {
    editor ? editor.chain().focus().toggleUnderline().run() : null;
  };

  const strikeToggle = () => {
    editor ? editor.chain().focus().toggleStrike().run() : null;
  };

  const codeToggle = () => {
    editor ? editor.chain().focus().toggleCode().run() : null;
  };

  const createNote = async () => {
    const user = await getUser();
    const { error, data } = await supabase.from("notes").insert({
      owner_id: user.id,
      content: {},
    });

    if (error) {
      console.error(error);
      return;
    }

    await getNotes();
  };

  const buttonStyle =
    "border-none p-2 rounded-xl cursor-pointer bg-gray-700 text-white hover:bg-gray-800 transition duration-200 ease-in-out";
  const activeButtonStyle =
    "border-none p-2 rounded-xl cursor-pointer bg-gray-800 text-white hover:bg-gray-900 transition duration-200 ease-in-out";

  return (
    showEditor && (
      <Draggable>
        <div className="outline-none flex flex-col flex-grow max-w-full w-1/2 bg-white rounded-xl">
          <DropdownMenu>
            <div className="inline-flex text-center justify-center">
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              {/** TODO: restyle this */}
              <button onClick={() => setShowEditor(false)}>Close</button>
            </div>
            <DropdownMenuContent className={"w-full flex flex-col"}>
              <DropdownMenuLabel>
                <div className={"w-1/2"}>
                  My Notes<Button onClick={createNote}>+</Button>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className={"flex flex-col"}>
                {notes.map((note, index) => (
                  <DropdownMenuItem key={index}>
                    <button
                      onClick={() => {
                        editor?.commands.setContent(
                          note.content as JSONContent
                        );
                        setActiveNote(note);
                      }}
                    >
                      {note.created_at}
                    </button>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex justify-between items-center border-b p-4 gap-1">
            <div className="flex gap-2 p-1">
              <button
                className={
                  editor?.isActive("bold") ? activeButtonStyle : buttonStyle
                }
                onClick={boldToggle}
              >
                bold
              </button>
              <button
                className={
                  editor?.isActive("italic") ? activeButtonStyle : buttonStyle
                }
                onClick={italicToggle}
              >
                italic
              </button>
              <button
                className={
                  editor?.isActive("underline")
                    ? activeButtonStyle
                    : buttonStyle
                }
                onClick={underlineToggle}
              >
                underline
              </button>
              <button
                className={
                  editor?.isActive("strike") ? activeButtonStyle : buttonStyle
                }
                onClick={strikeToggle}
              >
                strike
              </button>
              <button
                className={
                  editor?.isActive("code") ? activeButtonStyle : buttonStyle
                }
                onClick={codeToggle}
              >
                code
              </button>
            </div>
          </div>
          <EditorContent
            editor={editor}
            className="outline-none flex border-none flex-col flex-grow p-6 overflow-auto"
          />
        </div>
      </Draggable>
    )
  );
}
