"use client"

import { getLinkedinPosts } from "../../../lib/api"
import { timeAgo } from "../../../lib/dateUtils"
import RichText from "./RichText"
import type { BlocksContent } from "@strapi/blocks-react-renderer"
import { AnimatePresence, motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useEffect, useState, useRef } from "react"


// Types

type MediaItem = {
  url: string
  mime: string
}

type Post = {
  id: number
  description: BlocksContent
  date: string
  images: MediaItem[]
}

// Composant principal

export default function LinkedinPreview() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getLinkedinPosts().then((data) => {
      const formatted = data.map((post: Post) => ({
        ...post,
        date: timeAgo(post.date),
      }))
      setPosts(formatted)
    })
  }, [])

  return (
    <section className="py-16 px-4 bg-[#F5EFE3] text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="md:text-5xl text-3xl flex text-[#01794D] justify-center md:justify-start font-azoBlack mb-10">
          Actualités
        </h2>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          {posts.length > 0 && <MobileCarousel posts={posts} />}
        </div>
      </div>
    </section>
  )
}

// Composant MobileCarousel

function MobileCarousel({ posts }: { posts: Post[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % posts.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <div className="relative" {...handlers}>
      <div className="w-full">
        <PostCard post={posts[currentIndex]} />
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full border border-black transition ${
              currentIndex === i ? "bg-[#01794D]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Composant PostCard

function PostCard({ post }: { post: Post }) {
  const [current, setCurrent] = useState(0)
  const total = post.images.length
  const media = post.images[current]
  const [isOverflowing, setIsOverflowing] = useState(false)
const textRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const el = textRef.current
  if (el) {
    setIsOverflowing(el.scrollHeight > el.clientHeight)
  }
}, [])


  if (!media) {
    return (
      <article className="h-[500px] flex flex-col border rounded-xl shadow-md overflow-hidden text-sm bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="p-4 text-sm font-azoSansRegular text-gray-800">
          <p className="text-red-600">Aucun média disponible</p>
        </div>
      </article>
    )
  }

  const isVideo = media.mime?.startsWith("video")

  const handleNext = () => setCurrent((prev) => (prev + 1) % total)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total)

  return (
    <article className="h-[500px] flex flex-col border rounded-xl shadow-md overflow-hidden text-sm bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <a
        href="https://www.linkedin.com/company/panorama-be/posts/?feedView=all"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 flex items-start gap-3 border-b hover:bg-gray-50 transition"
      >
        <img
          src="/icons/LogoSimplePanoramaBlanc.svg"
          alt="Panorama"
          className="w-12 h-12 px-2 bg-[#01794D]"
        />
        <div>
          <p className="font-bold text-sm leading-4">Panorama</p>
          <p className="text-xs text-gray-500">{post.date} • 🌐</p>
        </div>
      </a>

      {/* Description (scroll simple) */}
     <div className="relative max-h-[180px]">
  <div
    ref={textRef}
    className="overflow-y-auto h-full p-4 text-sm font-azoSansRegular text-gray-800 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
  >
    <RichText content={post.description} />
  </div>

  {isOverflowing && (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
  )}
</div>

      {/* Media */}
      <div className="relative w-full h-56 max-h-[300px] overflow-hidden flex items-center justify-center bg-black">
        {isVideo ? (
          <video
            src={media.url}
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <img
              src={media.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-50 scale-110"
              aria-hidden="true"
            />
            <img
              src={media.url}
              alt={`slide ${current + 1}`}
              className="relative z-10 h-full object-contain"
            />
          </>
        )}

        {total > 1 && (
          <>
            <span className="absolute top-2 right-2 bg-black/90 text-white text-xs px-2.5 py-1 rounded shadow-md backdrop-blur-sm">
              {current + 1}/{total}
            </span>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-1 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-1 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>
    </article>
  )
}
