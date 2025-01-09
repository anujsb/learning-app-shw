"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Send, Check, Loader2, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";

interface UserInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Hero = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    // Reset submitted state when user starts typing again
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous states
    setIsSubmitted(false);
    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!serviceID || !templateID || !userID) {
      toast.error(
        "Email service configuration is missing. Check environment variables."
      );
      console.error("Environment variables are not properly configured.");
      setIsSubmitting(false);
      return;
    }

    const emailParams = {
      name: userInput.name,
      email: userInput.email,
      phone: userInput.phone,
      message: userInput.message,
    };

    try {
      console.log("Sending email with params:", emailParams);

      const res = await emailjs.send(
        serviceID,
        templateID,
        emailParams,
        userID
      );
      console.log("Response from EmailJS:", res);

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setUserInput({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSubmitted(true);
      } else {
        toast.error(`Error: ${res.text || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-36 w-full px-4 md:mt-48">
      <div className="max-w-4xl">
        <h1 className="text-7xl bg-clip-text text-transparent bg-gradient-to-l from-neutral-100 to-neutral-500">
          Learn Smarter with AI-Powered Assistance
        </h1>
        {/* <p className="mt-5 mx-20 text-neutral-500">
          Experience personalized learning through conversation, voice, and
          visual interaction. Your AI tutor adapts to your unique learning style
          and pace.
        </p> */}
        <p className="text-xl text-neutral-500 mt-5 mx-20">
          <span className="text-white"> We get it.</span> learning shouldn’t
          feel like a grind. With
          <span className="text-white"> EduMate, </span> unlock tools
          that adapt to you, making success not just achievable but enjoyable.
        </p>
        {/* <p>Launching Soon</p> */}
        {/* <p className="mt-5 mx-20 text-neutral-500">
          Be among the first to experience the future of learning. Sign up for
          early access and exclusive updates!
        </p> */}
        <form
          onSubmit={handleSubmit}
          className="flex border rounded-full p-2 border-muted-foreground mt-10 mx-20"
        >
          <Input
            name="email"
            type="email"
            id="email"
            value={userInput.email}
            required
            onChange={handleChange}
            disabled={isSubmitting || isSubmitted}
            className="border-none"
            placeholder="name@email.com"
          />
          <Button
            type="submit"
            className="text-black rounded-full shadow-primary shadow-md"
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Message Sent
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Early Access
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
