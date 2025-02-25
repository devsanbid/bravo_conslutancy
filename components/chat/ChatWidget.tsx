"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Phone, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

export default function ChatWidget() {
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Mock data - replace with real data from your backend
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "Support Team",
      lastMessage: "How can we help you today?",
      timestamp: new Date(),
      unread: 2,
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can we help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ]);

  const handleStartChat = () => {
    if (name && phone) {
      // Here you would typically:
      // 1. Create a new chat session
      // 2. Connect to your chat backend
      // 3. Store user details
      setIsStartChatOpen(false);
      setActiveChat("new");
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically:
      // 1. Send message to your backend
      // 2. Update local state
      setMessage("");
    }
  };

  return (
    <>
      {/* Chat List Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg md:bottom-8"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Open chat</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Messages</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-5rem)]">
            <ScrollArea className="flex-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors border-b"
                  onClick={() => setActiveChat(chat.id)}
                >
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{chat.name}</p>
                      <span className="text-xs text-gray-500">
                        {chat.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </ScrollArea>

            <div className="p-4 border-t mt-auto">
              <Dialog open={isStartChatOpen} onOpenChange={setIsStartChatOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Start New Chat</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start a New Chat</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleStartChat}
                      className="w-full"
                      disabled={!name || !phone}
                    >
                      Start Chat
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active Chat Dialog */}
      <Dialog open={!!activeChat} onOpenChange={() => setActiveChat(null)}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Chat with Support</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}