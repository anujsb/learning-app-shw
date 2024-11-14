import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Video from "./Video";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen w-full mt-20">
      <div className="max-w-3xl">
        <h1 className="text-7xl bg-clip-text text-transparent bg-gradient-to-l from-neutral-100 to-neutral-500">
          Learn Smarter with AI-Powered Assistance
        </h1>
        <p className="mt-5 mx-20 text-neutral-500">
          Experience personalized learning through conversation, voice, and
          visual interaction. Your AI tutor adapts to your unique learning style
          and pace.
        </p>
        {/* <p>Launching Soon</p> */}
        <p className="mt-5 mx-20 text-neutral-500">
          Be among the first to experience the future of learning. Sign up for
          early access and exclusive updates!
        </p>
        <div className="flex border rounded-full p-2 border-muted-foreground mt-10 mx-20">
          <Input
            className="border-none"
            type="email"
            placeholder="name@email.com"
          />
          <Button className="text-black rounded-full shadow-primary shadow-md">
            Get Early Access
          </Button>
        </div>
      </div>
      {/* <Video/> */}
    </div>
  );
};

export default Hero;
