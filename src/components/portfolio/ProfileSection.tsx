
"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import profilePic from "@/assets/pp.jpeg";

export const ProfileSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);
  }, []);

  const mailHref = isMobile
    ? "mailto:kabirkaife@gmail.com"
    : "https://mail.google.com/mail/?view=cm&fs=1&to=kabirkaife@gmail.com";

  return (
    <section id="profile">
       <div className="md:hidden mb-10 text-center">
        <Avatar
          className={"mx-auto w-24 h-24 mb-4 border-4 border-primary/20 shadow-lg"}
        >
          <AvatarImage src={profilePic.src} alt="Profile Picture" />
          <AvatarFallback>FK</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-foreground font-headline">
          Fahad Kabir
        </h1>
        <p className="text-sm text-primary">DevOps Engineer</p>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
        Personal Info
      </h2>
      <Card className="bg-card/50">
        <CardContent className="p-8 text-lg">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              DevOps Engineer | Infrastructure Automation | Full-Stack Enthusiast
            </h3>
            <Separator className="mb-6" />
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I specialize in turning manual, error-prone deployment processes into automated, high-availability engines. By leveraging <strong>Linux, Docker, and Ansible</strong>, I help teams ship code faster and spend less time debugging infrastructure.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Currently, I am focused on optimizing cloud environments and bridging the gap between Development and Operations through robust CI/CD architecture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Bashundhara R/A, Dhaka</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+8801772967944" className="hover:underline hover:text-primary transition-colors">
                +880 1772-967944
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={mailHref}
                target={isMobile ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="hover:underline hover:text-primary transition-colors"
              >
                kabirkaife@gmail.com
              </a>
            </div>
          </div>

          <Button
            asChild
            className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            <a
              href="https://drive.google.com/file/d/1tERFX5p_dUU_75cuF6WsDpuMPJp4JnvI/view?usp=sharing"
              target="_blank"
              download="Fahad_Kabir_Resume.pdf"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Further details are available in my resume.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
