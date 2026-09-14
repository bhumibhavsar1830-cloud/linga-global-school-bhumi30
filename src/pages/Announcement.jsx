import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function Announcement() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnnouncements() {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('category', 'announcement')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPosts(data)
      }

      setLoading(false)
    }

    loadAnnouncements()
  }, [])

  return (
    <main className="min-h-screen bg-[#F1E9E3]">
      <section className="px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs uppercase tracking-[0.25em] text-[#C6A66B]"
          >
            News from Linga
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl leading-tight text-[#292629] sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 600,
            }}
          >
            Announcements
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 h-[2px] bg-[#C6A66B]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-2xl text-sm leading-6 text-black/55 md:text-base"
          >
            Notices, events and updates from the school office —
            check back regularly for what's happening at Linga
            Global School.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-xs uppercase tracking-[0.18em] text-black/35"
          >
            {loading
              ? 'Loading…'
              : `${posts.length} ${
                  posts.length === 1 ? 'notice' : 'notices'
                }`}
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-4xl">
          {!loading && posts.length === 0 && (
            <p className="text-sm text-black/45">
              No announcements posted yet.
            </p>
          )}

          <div className="flex flex-col gap-5">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.04, 0.2),
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-xl
                  bg-white/60
                  p-5
                  md:p-7
                "
              >
                <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#C6A66B] transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  {post.file_url && (
                    <img
                      src={post.file_url}
                      alt={post.title}
                      loading="lazy"
                      className="h-44 w-full rounded-lg object-cover md:h-32 md:w-44 md:flex-shrink-0"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#C98F9A]">
                      {formatDate(post.created_at)}
                    </p>

                    <h2
                      className="mt-2 text-xl leading-snug text-[#292629] md:text-2xl"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 600,
                      }}
                    >
                      {post.title}
                    </h2>

                    {post.description && (
                      <p className="mt-3 text-sm leading-6 text-black/55 md:text-base">
                        {post.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
