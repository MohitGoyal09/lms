"use client"
import Selectoption from '@/components/create/Selectoption'
import TopicInput from '@/components/create/TopicInput'
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'
import React from 'react'

export default function Create() {
  const [step , setStep] = React.useState(0)
  const [form , setForm] = React.useState({
    studyType : "",
    topic : "",
    difficulty : ""
  })
  const handleUserInput = (field : string , value : string) => {
    setForm({
      ...form,
      [field] : value
    })
    console.log(form)
  }
  
  return (
    <div className="p-5 flex flex-col items-center md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-3xl text-blue-600">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 ">
        Fill the details in order to generate stduy material for you
      </p>
      <div className="mt-10">
        {step == 0 ? (
          <Selectoption
            selectedStudyType={(value) => handleUserInput("studyType", value)}
          />
        ) : (
          <div className="mt-10">
            {" "}
            <TopicInput setTopic = {
              (value) => handleUserInput("topic" , value)
            } 
            setDifficulty = {
              (value) => handleUserInput("difficulty" , value)
            }/>{" "}
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between mt-10 items-center w-full ">
        <Button
          variant="outline"
          className="hover:bg-blue-50"
          disabled={step === 0}
          onClick={() => setStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        {step === 0 ? (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Sparkle />
            Generate
          </Button>
        )}
      </div>
    </div>
  );
}

