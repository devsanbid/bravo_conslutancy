"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { isEmailVerified } from "@/lib/auth";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function EmailVerificationBanner() {
  const [needsVerification, setNeedsVerification] = useState(false);

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const checkEmailVerification = async () => {
    const verified = await isEmailVerified();
    setNeedsVerification(!verified);
  };

  const resendVerificationEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
      });
      
      if (error) throw error;
      
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again.");
    }
  };

  if (!needsVerification) return null;

  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-5 w-5 text-yellow-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-yellow-800">
          Please verify your email address to access all features.
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={resendVerificationEmail}
          className="ml-4"
        >
          Resend Verification Email
        </Button>
      </AlertDescription>
    </Alert>
  );
}