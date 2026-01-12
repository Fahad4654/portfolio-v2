
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Instagram, Facebook } from "lucide-react";
import { Separator } from "../ui/separator";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="#1877F2"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  
  const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#instagram-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <radialGradient id="instagram-gradient" cx="0.3" cy="1" r="1">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="0.5" stopColor="#FF7A00" />
          <stop offset="1" stopColor="#D62976" />
        </radialGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

  return (
    <section id="contact">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
        Contact Me
      </h2>
      <Card className="bg-card">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-input"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[150px] bg-input"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Please provide a valid email to receive a response. I'll get back to you as soon as possible.
          </p>

          <Separator className="my-8" />

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Connect on Social Media
            </h3>
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://www.facebook.com/kaife.kabir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/kaife_kabir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
