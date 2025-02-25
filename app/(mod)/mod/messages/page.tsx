"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "mod";
  timestamp: Date;
  userId: number;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  online: boolean;
}

export default function MessagesManagement() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      lastMessage: "Hello, I need help with my application",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      lastMessage: "Thank you for your help!",
      unread: 0,
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Hello, I need help with my application",
      sender: "user",
      timestamp: new Date(),
      userId: 1,
    },
    {
      id: "2",
      text: "Of course! How can I help you?",
      sender: "mod",
      timestamp: new Date(),
      userId: 1,
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUser) return;
    // Here you would typically send the message to your backend
    console.log("Sending message:", messageText, "to user:", selectedUser);
    setMessageText("");
  };

  return (
    <div className="p-6 h-[calc(100vh-2rem)]">
      <div className="flex h-full gap-6">
        {/* Users List */}
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  className="w-full p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors border-b relative"
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{user.name}</p>
                      {user.unread > 0 && (
                        <span className="bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {user.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {user.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1">
          {selectedUser ? (
            <div className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={users.find((u) => u.id === selectedUser)?.avatar}
                    />
                    <AvatarFallback>
                      {users
                        .find((u) => u.id === selectedUser)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {users.find((u) => u.id === selectedUser)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {users.find((u) => u.id === selectedUser)?.online
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-auto">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {messages
                      .filter((m) => m.userId === selectedUser)
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "mod"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "mod"
                                ? "bg-brand-orange text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
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
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}