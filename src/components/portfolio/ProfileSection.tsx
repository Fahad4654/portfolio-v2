
"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
        Personal Info
      </h2>
      <Card className="bg-card/50">
        <CardContent className="p-8 text-lg">
          <p className="text-muted-foreground mb-8 leading-relaxed">
            DevOps Engineer with expertise in cloud infrastructure, CI/CD
            pipelines, and system automation. Skilled in Node.js, React, Docker,
            and Ansible, with a strong background in problem-solving and
            optimizing system performance. Passionate about collaborating with
            teams to drive efficiency and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Bashundhara R/A, Dhaka</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span>+880 1772-967944</span>
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
