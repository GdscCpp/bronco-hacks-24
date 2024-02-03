export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      annoucements: {
        Row: {
          content: string | null
          courseId: number | null
          created_at: string
          id: number
          posterId: number | null
          replies: Json | null
        }
        Insert: {
          content?: string | null
          courseId?: number | null
          created_at?: string
          id?: number
          posterId?: number | null
          replies?: Json | null
        }
        Update: {
          content?: string | null
          courseId?: number | null
          created_at?: string
          id?: number
          posterId?: number | null
          replies?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "annoucements_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      assignments: {
        Row: {
          course_id: number | null
          created_at: string
          due_at: string | null
          id: number
          name: string | null
          questions: Json | null
          value: number | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          due_at?: string | null
          id?: number
          name?: string | null
          questions?: Json | null
          value?: number | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          due_at?: string | null
          id?: number
          name?: string | null
          questions?: Json | null
          value?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          id: number
          number: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          number?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          number?: string | null
          title?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: Json | null
          course_id: number | null
          created_at: string
          id: number
          sender_id: number | null
        }
        Insert: {
          content?: Json | null
          course_id?: number | null
          created_at?: string
          id?: number
          sender_id?: number | null
        }
        Update: {
          content?: Json | null
          course_id?: number | null
          created_at?: string
          id?: number
          sender_id?: number | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: Json | null
          created_at: string
          id: number
          owner_id: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
          owner_id?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
          owner_id?: number | null
        }
        Relationships: []
      }
      schedules: {
        Row: {
          created_at: string
          id: number
          schedule: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          schedule?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          schedule?: Json | null
        }
        Relationships: []
      }
      users: {
        Row: {
          course_ids: number[] | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          note_ids: number[] | null
          profilePicture: string | null
          schedule_id: number | null
          type: string | null
          uuid: string
        }
        Insert: {
          course_ids?: number[] | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          note_ids?: number[] | null
          profilePicture?: string | null
          schedule_id?: number | null
          type?: string | null
          uuid: string
        }
        Update: {
          course_ids?: number[] | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          note_ids?: number[] | null
          profilePicture?: string | null
          schedule_id?: number | null
          type?: string | null
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
