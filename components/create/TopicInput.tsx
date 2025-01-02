import React from 'react'
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TopicInput({ setTopic, setDifficulty } : {setTopic : (value : string) => void , setDifficulty : (value : string) => void}) {
  return (
    <div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message" className="font-bold text-md">
          Enter topic or paste content for which you want to generate study
          material
        </Label>
        <Textarea
          placeholder="Start writing here."
          className="mt-2 w-full"
          onChange={(event) => setTopic(event.target.value)}
        />
      </div>
      <div className="mt-8 flex items-center justify-center flex-col gap-1.5">
        <div className="mt-6 font-bold text-md ">Select Difficulty Level</div>
        <Select onValueChange={(value) => setDifficulty(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder=" Difficulty Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
