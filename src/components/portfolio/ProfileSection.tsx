
"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import profilePic from "@/assets/pp.jpeg";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";

type Profile = {
  headline: string;
  bio1: string;
  bio2: string;
  location: string;
  phone: string;
  email: string;
  resume_url: string;
};

export const ProfileSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);

    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .single();

        if (error) {
            console.error("Error fetching profile:", error);
        } else {
            setProfile(data);
        }
        setLoading(false);
    };

    fetchProfile();
  }, []);

  const mailHref = isMobile && profile
    ? `mailto:${profile.email}`
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${profile?.email}`;

  if (loading || !profile) {
      return (
        <section id="profile">
            <div className="md:hidden mb-10 text-center">
                <Skeleton className="mx-auto w-24 h-24 mb-4 rounded-full" />
                <Skeleton className="h-7 w-48 mx-auto mb-2" />
                <Skeleton className="h-5 w-32 mx-auto" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
                Personal Info
            </h2>
            <Card className="bg-card">
                <CardHeader className="p-8 pb-4 bg-muted/50 rounded-t-lg text-center">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4"></div>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <div className="pt-4">
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-4 w-56 mt-4" />
                    </div>
                </CardContent>
            </Card>
        </section>
      );
  }

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

      <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
        Personal Info
      </h2>
      <Card className="bg-card relative">
        {isLoggedIn && (
            <Button variant="outline" size="icon" className="absolute top-4 right-4 z-10">
                <Edit className="h-4 w-4" />
            </Button>
        )}
        <CardHeader className="p-8 pb-4 bg-muted/50 rounded-t-lg text-center">
            <CardTitle className="text-xl font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: profile.headline }} />
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4"></div>
        </CardHeader>
        <CardContent className="p-8 pt-4 text-lg">
          <div>
            <p className="text-muted-foreground mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: profile.bio1 }} />
            <p className="text-muted-foreground mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: profile.bio2 }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href={`tel:${profile.phone}`} className="hover:underline hover:text-primary transition-colors">
                {profile.phone}
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
                {profile.email}
              </a>
            </div>
          </div>

          <Button
            asChild
            className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            <a
              href={profile.resume_url}
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
