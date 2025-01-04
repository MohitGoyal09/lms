import { BookOpen, FileQuestion, Layers, ListChecks } from 'lucide-react'
import React from 'react'
import {
  Card,
 
  CardDescription,
    CardHeader,
  CardTitle,
} from "@/components/ui/card";        
import { Button } from '../ui/button';


export default function StudyMaterial() {
    const MaterialList = [
        {
            name : 'Notes/Chapter',
            desc : 'Chapter wise notes',
            icon : BookOpen,
            path : '/notes'
        },
        {
            name : 'Flashcards',
            desc : 'Chapter wise flashcards',
            icon : Layers,
            path : '/flashcards'
        },
        {
            name : 'Quizs',
            desc : 'Chapter wise quizs',
            icon : ListChecks,
            path : '/quizs'
        },
        {
            name : 'Practice Questions',
            desc : 'Chapter wise practice questions',
            icon : FileQuestion,
            path : '/practice-questions'
        }
    ]
  return (
    
<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
    {MaterialList.map((item, index) => (
        <Card 
            key={index} 
            className="transition-all duration-300 hover:bg-slate-100 hover:shadow-lg hover:scale-105 cursor-pointer"
        >
            <CardHeader className="space-y-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {item.desc}
                    </CardDescription>
                </div>
                <Button className="w-full mt-2" variant="outline">
                    View {item.name}
                </Button>
            </CardHeader>
        </Card>
    ))}
</div>
  )
}

