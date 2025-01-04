'use client'
import { useParams } from 'next/navigation';
import React , {useEffect , useState} from 'react'
import axios from 'axios';

export default function NotesPage() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [ setCount , setSetCount] = useState(0);
    useEffect(() => {
        GetNotes();
    }, [courseId]);
    const GetNotes = async () => {
    const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "notes",
    }
    )
    setNotes(result.data.notes);
    console.log(result.data.notes);
}
  return (
    <div>
        <div>

        </div>
    </div>
  )
}
