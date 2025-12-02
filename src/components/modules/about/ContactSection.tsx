"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-card/40 backdrop-blur-sm border-t border-border/40">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? Wed love to hear from you. Send us a message and
            we’ll respond as soon as possible.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto items-start">
          {/* LEFT — CONTACT INFO */}
          <div className="space-y-5 self-start">
            {[
              {
                icon: Mail,
                title: "Email Us",
                lines: ["support@proconnect.com", "sales@proconnect.com"],
              },
              {
                icon: MapPin,
                title: "Our Office",
                lines: [
                  "100 Market Street, Suite 400",
                  "San Francisco, CA 94105",
                ],
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm PST"],
              },
           
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-background/60 border-border/50 shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      {item.title}
                    </h3>
                    {item.lines.map((line, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RIGHT — CONTACT FORM */}
          <Card className="lg:col-span-2 bg-background/60 border-border/50 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below — we’ll get back to you shortly.
              </CardDescription>
            </CardHeader>

            <CardContent>
  
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone (Optional)</Label>
                      <Input placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

               

                  {/* Message */}
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      rows={5}
                      placeholder="Tell us how we can help..."
                      required
                      className="resize-none"
                    />
                  </div>

                  {/* Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-base flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
