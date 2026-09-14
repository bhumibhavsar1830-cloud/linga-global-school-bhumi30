import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGallery() {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('category', 'gallery')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPhotos(data)
      }

      setLoading(false)
    }

    loadGallery()
  }, [])

  return (
    <main className="min-h-screen bg-[#F1E9E3]">
      <section className="px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs uppercase tracking-[0.25em] text-[#C6A66B]"
          >
            Life at Linga
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
            Gallery
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
            Explore memorable moments, learning experiences,
            celebrations, activities, sports and everyday life
            at Linga Global School.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-xs uppercase tracking-[0.18em] text-black/35"
          >
            {loading
              ? 'Loading…'
              : `${photos.length} ${
                  photos.length === 1 ? 'photo' : 'photos'
                }`}
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        {!loading && photos.length === 0 && (
          <p className="mx-auto max-w-7xl text-sm text-black/45">
            No photos added yet.
          </p>
        )}

        <div className="mx-auto max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.025, 0.25),
              }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[#F1E9E3]"
            >
              <img
                src={photo.file_url}
                alt={photo.title}
                loading="lazy"
                className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#C6A66B] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium capitalize !text-[#C98F9A]">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}