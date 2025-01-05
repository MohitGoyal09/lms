"use client"
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import axios from "axios";
export default function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  useEffect(() => {
    user && ChecknewUser();
  }, [user]);
  const ChecknewUser = async () => {
    
    const resp = await axios.post("/api/create-user", { user });
    console.log(resp.data.error);
    console.log(resp.data);
  };
  return <div>{children}</div>;
}
