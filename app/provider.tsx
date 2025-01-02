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
    // try {
    //   const result = await axios.post("/api/user", user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(result.data);
    // } catch (error) {
    //   console.error("General error in POST /api/user:", error);
    // }
    const resp = await axios.post("/api/create-user", { user });
    console.log(resp.data.error);
    console.log(resp.data);
  };
  return <div>{children}</div>;
}
