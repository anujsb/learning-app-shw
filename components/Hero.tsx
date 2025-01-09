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
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-36 w-full px-4">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-l from-neutral-100 to-neutral-500 px-4 md:px-0">
          Learn Smarter with AI-Powered Assistance
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 mt-4 md:mt-5 mx-4 md:mx-20">
          <span className="text-white"> We get it.</span> learning shouldn't
          feel like a grind. With
          <span className="text-white"> EduMate, </span> unlock tools
          that adapt to you, making success not just achievable but enjoyable.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row border rounded-2xl md:rounded-full p-2 border-muted-foreground mt-6 md:mt-10 mx-4 md:mx-20 gap-2 md:gap-0"
        >
          <Input
            name="email"
            type="email"
            id="email"
            value={userInput.email}
            required
            onChange={handleChange}
            disabled={isSubmitting || isSubmitted}
            className="border-none mb-2 md:mb-0"
            placeholder="name@email.com"
          />
          <Button
            type="submit"
            className="text-black rounded-xl md:rounded-full shadow-primary shadow-md w-full md:w-auto"
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