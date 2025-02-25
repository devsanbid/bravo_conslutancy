"use client"

import { ArrowRight, User, Clock } from "lucide-react"
import { motion } from "framer-motion"

const blogs = [
  {
    category: "Cyber Security",
    title: "Demystifying Artificial Intelligence",
    description: "Demystifying Artificial Intelligence: Understanding AI and Its Practical Applications",
    image: "/placeholder.svg?height=400&width=600",
    author: "Admin",
    date: "Feb 22, 2024",
    readTime: "5 min read",
  },
  {
    category: "Social Media Security Tips",
    title: "Sharing with Caution - Social Media Security Tips",
    description: "Sharing with Caution - Social Media Security Tips",
    image: "/placeholder.svg?height=400&width=600",
    author: "Social Media Security Tips",
    date: "Feb 21, 2024",
    readTime: "4 min read",
  },
  {
    category: "The Evolution of Wi-Fi",
    title: "The Evolution of Wi-Fi Continues: The Next Generation",
    description:
      "Wi-Fi 6 (802.11ax) was released in 2019 and represents an advancement from its predecessor, Wi-Fi 5 (802.11ac).",
    image: "/placeholder.svg?height=400&width=600",
    author: "The Evolution of Wi-Fi",
    date: "Feb 20, 2024",
    readTime: "6 min read",
  },
]

export default function RecentBlogSection() {
  return (
    <section className="px-4 py-10 md:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#C25934] font-medium mb-4 block"
          >
            BLOGS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Read Our Latest Tips & Tricks
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-[#C25934]" />
            <span className="h-1 w-2 bg-[#C25934] rounded-full" />
            <span className="h-[2px] w-8 bg-[#C25934]" />
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-[#C25934]">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#C25934] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button className="flex items-center justify-between w-full text-[#C25934] font-medium group-hover:gap-6 gap-2 transition-all duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}


