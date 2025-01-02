import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="py-5 flex flex-col items-center justify-center h-full">
      <SignUp />
    </div>
  );
}
